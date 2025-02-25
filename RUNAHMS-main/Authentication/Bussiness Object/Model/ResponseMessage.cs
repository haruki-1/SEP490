using System.Text.Json.Serialization;

namespace GraduationAPI_EPOSHBOOKING.Model
{
    public class ResponseMessage
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public object? Data { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Token { get; set; }
        public int StatusCode { get; set; }
    }
}
