using GraduationAPI_EPOSHBOOKING.Model;
using Microsoft.AspNetCore.Http;


namespace GraduationAPI_EPOSHBOOKING.IRepository
{
    public interface IAccountRepository
    {
      
        ResponseMessage ActiveAccount(String email);
        ResponseMessage LoginWithNumberPhone(String phone);
        ResponseMessage Register(String email, String password, String fullName, String phone);
        ResponseMessage UpdateNewPassword(String email,String newPassword);
        ResponseMessage UpdateProfileByAccount(int accountID,String email,String phone,Profile profile, IFormFile avatar);
        ResponseMessage GetProfileByAccountId(int accountId);
        ResponseMessage ChangePassword(int accountId, string oldPassword, string newPassword);
        ResponseMessage Login(String text, String password);
        ResponseMessage GoogleLogin(String email, String userName, String avatar);
        ResponseMessage RegisterManagerAccount(Account account, String fullName);
    }
}
        
 

