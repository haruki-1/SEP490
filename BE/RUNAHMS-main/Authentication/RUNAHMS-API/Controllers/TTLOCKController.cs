using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Security.Cryptography;
using System.Text;
using System.Net.Http;
using BusinessObject.Interfaces;
using BusinessObject.Entities;
using BusinessObject.Shares;
using Microsoft.EntityFrameworkCore;
using BusinessObject.DTO;

[ApiController]
[Route("api/ttlock")]
public class TTLOCKController(HttpClient _client, IConfiguration _configuration, IRepository<TTlockAccuont> _ttlockRepository) : ControllerBase
{
    [HttpPut("edit-ttlock-account")]
    public async Task<IActionResult> EditTTLockAccount([FromForm] UpdateTTLOCKAccountDTO reqeust)
    {
        var getTtlockAccount = await _ttlockRepository.FindWithInclude()
                                                .Include(x => x.HomeStay)
                                                .FirstOrDefaultAsync(x => x.HomeStayID == reqeust.HomeStayID);
        if (getTtlockAccount == null)
        {
            return NotFound();
        }
        getTtlockAccount.TTLockUserName = reqeust.TTLockUserName ?? getTtlockAccount.TTLockUserName;
        getTtlockAccount.Password = Util.GenerateMD5(reqeust.Password!) ?? getTtlockAccount.Password;

        await _ttlockRepository.UpdateAsync(getTtlockAccount);
        await _ttlockRepository.SaveAsync();

        return Ok(new { Message = "Update TTLOCk Account Success" });

    }
    [HttpPost("add-ttlock-account")]
        public async Task<IActionResult> AddTTLockAccount([FromBody]TTlockAccuontDTO request)
        {
            var addTTLockAccount = new TTlockAccuont
            {
                TTLockUserName = request.TTLockUserName,
                Password = Util.GenerateMD5(request.Password!),
                TTLockID = Guid.NewGuid(),
                HomeStayID = request.HomeStayID
            };

            await _ttlockRepository.AddAsync(addTTLockAccount);
            await _ttlockRepository.SaveAsync();

            return Ok(new { Message = "Add TTLockAccount Success" });
        }

    [HttpPost("user-locks")]
    public async Task<IActionResult> GetUserLocks([FromQuery] Guid homeStayID)
    {
        var ttlockAccount = await _ttlockRepository.FindWithInclude()
                           .Include(x => x.HomeStay)
                           .FirstOrDefaultAsync(x => x.HomeStayID == homeStayID);

        if (ttlockAccount == null)
            return NotFound(new { message = "TTLock account not found for this homestay." });

        var clientId = _configuration["TTLOCKConfig:client_id"];
        var clientSecret = _configuration["TTLOCKConfig:client_secret"];

        if (string.IsNullOrEmpty(clientId) || string.IsNullOrEmpty(clientSecret))
            return StatusCode(500, "TTLock client_id or client_secret is not configured.");

        var tokenForm = new Dictionary<string, string>
        {
            ["clientId"] = clientId,
            ["clientSecret"] = clientSecret,
            ["username"] = ttlockAccount.TTLockUserName!,
            ["password"] = ttlockAccount.Password!,
            ["grant_type"] = "password"
        };

        var tokenResponse = await _client.PostAsync("https://euapi.ttlock.com/oauth2/token", new FormUrlEncodedContent(tokenForm));
        var tokenJson = await tokenResponse.Content.ReadAsStringAsync();

        if (!tokenResponse.IsSuccessStatusCode)
        {
            return StatusCode((int)tokenResponse.StatusCode, new
            {
                message = "Error getting access_token",
                response = tokenJson
            });
        }

        var tokenObj = JsonSerializer.Deserialize<JsonElement>(tokenJson);
        if (!tokenObj.TryGetProperty("access_token", out var accessTokenProp))
        {
            return BadRequest(new
            {
                message = "Access_token not found",
                response = tokenJson
            });
        }

        var accessToken = accessTokenProp.GetString();

        long timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        var url = $"https://euapi.ttlock.com/v3/lock/list?" +
                  $"clientId={clientId}&" +
                  $"accessToken={accessToken}&" +
                  $"pageNo={1}&" +
                  $"pageSize={int.MaxValue}&" +
                  $"date={timestamp}";

        var lockResponse = await _client.GetAsync(url);
        var lockJson = await lockResponse.Content.ReadAsStringAsync();

        if (lockResponse.IsSuccessStatusCode)
        {
            var lockData = JsonSerializer.Deserialize<JsonElement>(lockJson);

            if (lockData.TryGetProperty("list", out var lockList))
            {
                var result = new List<GetTTLockResponse>();

                foreach (var item in lockList.EnumerateArray())
                {
                    var dto = new GetTTLockResponse
                    {
                        lockId = item.GetProperty("lockId").GetInt32(),
                        lockAlias = item.GetProperty("lockAlias").GetString(),
                        electricQuantity = item.GetProperty("electricQuantity").GetInt32()
                    };

                    result.Add(dto);
                }

                return Ok(new {Data = result });
            }
            else
            {
                return BadRequest(new { message = "Không tìm thấy danh sách khóa trong phản hồi." });
            }
        }
        return StatusCode((int)lockResponse.StatusCode, new
        {
            message = "Lỗi khi lấy danh sách khóa",
            response = lockJson
        });
    }

}
