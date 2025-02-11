using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Bussiness_Object.DTO.Request;
using DAL.IRepository;
using GraduationAPI_EPOSHBOOKING.DTO;
using GraduationAPI_EPOSHBOOKING.Model;
using GraduationAPI_EPOSHBOOKING.Ultils;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace DAL.Repository
{
    public class HomeStayRepository : IHomeStayRepository
    {
        private readonly DBContext db;
        private readonly IWebHostEnvironment environment;
        public HomeStayRepository(DBContext db, IWebHostEnvironment environment)
        {
            this.db = db;
            this.environment = environment;
        }

        public ResponseMessage AddHomeStay(int accountID, AddHomeStayRequest request, List<ServiceTypeDTO> Services)
        {
            var account = db.accounts
                         .Include(profile => profile.Profile)
                         .FirstOrDefault(a => a.AccountID == accountID);

            var addAddress = new HomeStayAddress
            {
                Address = Utils.RemoveVietnameseDiacritics(request.Address),
                City = Utils.RemoveVietnameseDiacritics(request.City),

            };

            db.homeStayAddress.Add(addAddress);
            var addHomeStay = new HomeStay
            {
                Name = request.Name,
                OpenedIn = request.OpenedIn,
                MainImage = Utils.SaveImage(request.MainImage, environment),
                Description = request.Description,
                Status = request.Status,
                HomeStayStandar = request.HomeStayStandar,
                Price = request.Price,
                Account = account,
                HomeStayAddress = addAddress
            };


            db.homeStay.Add(addHomeStay);
            db.SaveChanges(); // Save changes to generate IDs for the homeStay


            foreach (var service in Services)
            {
                var addService = new HomeStayService
                {
                    Type = service.serviceType,
                    HomeStay = addHomeStay,

                };
                db.homeStayService.Add(addService);
                db.SaveChanges();
                var homeStaySubService = new List<HomeStaySubService>();
                foreach (var subServiceName in service.subServiceName)
                {
                    var addSubService = new HomeStaySubService
                    {
                        SubServiceName = subServiceName,
                        HomeStayService = addService
                    };
                    db.homeStaySubService.Add(addSubService);
                    homeStaySubService.Add(addSubService);
                }
                addService.HomeStaySubServices = homeStaySubService;
            }

            foreach (var img in request.Images)
            {
                var addImage = new HomeStayImage
                {
                    Image = Utils.SaveImage(img, environment),
                    HomeStay = addHomeStay,
                    Title = "homeStay View"
                };

                db.homeStayImage.Add(addImage);
            }
            var responseData = new
            {
                HomeStayID = addHomeStay.HomeStayID,
                MainImage = addHomeStay.MainImage,
                Name = addHomeStay.Name,
                OpenedIn = addHomeStay.OpenedIn,
                Description = addHomeStay.Description,
                HomeStayStandar = addHomeStay.HomeStayStandar,
                Status = addHomeStay.Status,
                Account = new
                {
                    addHomeStay.Account.AccountID,
                    addHomeStay.Account.Email,
                    addHomeStay.Account.Phone,
                    addHomeStay.Account.IsActive,
                    Profile = new
                    {
                        addHomeStay.Account.Profile.ProfileID,
                        addHomeStay.Account.Profile.fullName,
                        addHomeStay.Account.Profile.BirthDay,
                        addHomeStay.Account.Profile.Gender,
                        addHomeStay.Account.Profile.Address,
                        addHomeStay.Account.Profile.Avatar
                    }
                },
                HomeStayAddress = new
                {
                    addAddress.Address,
                    addAddress.City
                },
                HomeStayImages = addHomeStay.HomeStayImages.Select(img => new
                {
                    img.ImageID,
                    img.Title,
                    img.Image
                }).ToList(),
                HomeStayServices = addHomeStay.HomeStayServices.Select(service => new
                {
                    service.Type,
                    HomeStaySubServices = service.HomeStaySubServices.Select(subService => new
                    {
                        subService.SubServiceName
                    }).ToList()
                }).ToList()
            };
            db.SaveChanges(); // Save all changes at the end
            return new ResponseMessage
            {
                Success = true,
                Data = responseData,
                Message = "Successfully registered homeStay",
                StatusCode = (int)HttpStatusCode.OK
            };
        }

        public ResponseMessage GetAllCity()
        {
            var listAddress = db.homeStayAddress
                                .Select(address => address.City.Trim())
                                .Distinct()
                                .ToList()
                                .Select(city => new
                                {
                                    City = city
                                });

            return new ResponseMessage { Success = true, Message = "Successfully", Data = listAddress, StatusCode = (int)HttpStatusCode.OK };
        }


        public ResponseMessage GetAllHomeStay()
        {
            var listHomeStay = db.homeStay
                                 .Include(x => x.HomeStayAddress)
                                 .Include(x=> x.HomeStayImages)
                                 .Include(x => x.HomeStayServices)!
                                 .ThenInclude(x => x.HomeStaySubServices)
                                 .Where(x => x.Status == true).ToList();
            if (listHomeStay != null)
            {
                var homeStayList = listHomeStay.Select(homeStay => new
                {
                    HomeStayID = homeStay.HomeStayID,
                    Name = homeStay.Name,
                    MainImage = homeStay.MainImage,
                    OpenedIn = homeStay.OpenedIn,
                    Description = homeStay.Description,
                    homeStayStandar = homeStay.HomeStayStandar,
                    Status = homeStay.Status,
                    homeStayAddress = new
                    {
                        homeStay.HomeStayAddress.AddressID,
                        homeStay.HomeStayAddress.Address,
                        homeStay.HomeStayAddress.City,

                    },
                    homeStayService = homeStay.HomeStayServices.Select(service => new
                    {
                        ServiceID = service.ServiceID,
                        ServiceType = service.Type,
                        homeStaySubService = service.HomeStaySubServices.Select(subService => new
                        {
                            SubServiceID = subService.SubServiceID,
                            Name = subService.SubServiceName
                        }).ToList()
                    }).ToList(),
                }).ToList();

                return new ResponseMessage
                {
                    Success = true,
                    Message = "Success",
                    Data = homeStayList,
                    StatusCode = (int)HttpStatusCode.OK
                };
            }

            return new ResponseMessage
            {
                Success = false,
                Message = "Data Not Found",
                Data = listHomeStay,
                StatusCode = (int)HttpStatusCode.NotFound
            };


        }

        public ResponseMessage GetHomeStayByCity(string city)
        {
            var listHomeStay = db.homeStay
                              .Include(x => x.HomeStayAddress)
                              .Include(x => x.HomeStayImages)
                              .Include(x => x.HomeStayServices)!
                              .ThenInclude(x => x.HomeStaySubServices)
                              .Where(x => x.HomeStayAddress.City.Equals(city)).ToList();
            if (listHomeStay != null)
            {
                var homeStayList = listHomeStay.Select(homeStay => new
                {
                    HomeStayID = homeStay.HomeStayID,
                    Name = homeStay.Name,
                    MainImage = homeStay.MainImage,
                    OpenedIn = homeStay.OpenedIn,
                    Description = homeStay.Description,
                    homeStayStandar = homeStay.HomeStayStandar,
                    Status = homeStay.Status,
                    homeStayAddress = new
                    {
                        homeStay.HomeStayAddress.AddressID,
                        homeStay.HomeStayAddress.Address,
                        homeStay.HomeStayAddress.City,

                    },
                    homeStayService = homeStay.HomeStayServices.Select(service => new
                    {
                        ServiceID = service.ServiceID,
                        ServiceType = service.Type,
                        homeStaySubService = service.HomeStaySubServices.Select(subService => new
                        {
                            SubServiceID = subService.SubServiceID,
                            Name = subService.SubServiceName
                        }).ToList()
                    }).ToList(),
                }).ToList();

                return new ResponseMessage
                {
                    Success = true,
                    Message = "Success",
                    Data = homeStayList,
                    StatusCode = (int)HttpStatusCode.OK
                };
            }


            return new ResponseMessage
            {
                Success = false,
                Message = "Data Not Found",
                Data = listHomeStay,
                StatusCode = (int)HttpStatusCode.NotFound
            };
        }

        public ResponseMessage GetHomeStayDetail(int homeStayID)
        {
            var getDetail = db.homeStay
                                 .Include(x => x.HomeStayAddress)
                                 .Include(x => x.HomeStayImages)
                                 .Include(x => x.HomeStayServices)!
                                 .ThenInclude(x => x.HomeStaySubServices)
                                 .FirstOrDefault(x => x.HomeStayID == homeStayID);
            if (getDetail != null)
            {
                var homeStayDetail = new
                {
                    HomeStayID = getDetail.HomeStayID,
                    Name = getDetail.Name,
                    MainImage = getDetail.MainImage,
                    OpenedIn = getDetail.OpenedIn,
                    Description = getDetail.Description,
                    HomeStayStandar = getDetail.HomeStayStandar,
                    Status = getDetail.Status,
                    HomeStayAddress = new
                    {
                        getDetail.HomeStayAddress.AddressID,
                        getDetail.HomeStayAddress.Address,
                        getDetail.HomeStayAddress.City
                    },
                    HomeStayImages = getDetail.HomeStayImages.Select(image => new
                    {
                        image.ImageID,
                        image.Title,
                        image.Image
                    }).ToList(),
                    HomeStayServices = getDetail.HomeStayServices.Select(service => new
                    {
                        service.ServiceID,
                        service.Type,
                        HomeStaySubServices = service.HomeStaySubServices.Select(subService => new
                        {
                            subService.SubServiceID,
                            subService.SubServiceName
                        }).ToList()
                    }).ToList()
                };

                return new ResponseMessage
                {
                    Success = true,
                    Message = "Success",
                    Data = homeStayDetail,
                    StatusCode = (int)HttpStatusCode.OK
                };
            }

            return new ResponseMessage
            {
                Success = false,
                Message = "Data Not Found",
                Data = getDetail,
                StatusCode = (int)HttpStatusCode.NotFound
            };
        }

        public ResponseMessage AddHomeStayImage(int homeStayID, String title, IFormFile images)
        {
            var homeStay = db.homeStay.FirstOrDefault(hotel => hotel.HomeStayID == homeStayID);
            if (homeStay != null)
            {
                HomeStayImage addImage = new HomeStayImage
                {
                    Title = title,
                    Image = Utils.SaveImage(images, environment),
                    HomeStay = homeStay
                };
                db.homeStayImage.Add(addImage);
                db.SaveChanges();
                return new ResponseMessage { Success = true, Data = homeStay, Message = "Successfully", StatusCode = (int)HttpStatusCode.OK };
            }
            return new ResponseMessage { Success = false, Data = null, Message = "Hotel not found", StatusCode = (int)HttpStatusCode.NotFound };
        }

        public ResponseMessage DeleteHomeStayImages(int imageID)
        {
            var getImage = db.homeStayImage.FirstOrDefault(image => image.ImageID == imageID);
            if (getImage != null)
            {
                db.homeStayImage.Remove(getImage);
                db.SaveChanges();
                return new ResponseMessage { Success = true, Data = getImage, Message = "Successfully", StatusCode = (int)HttpStatusCode.OK };
            }
            return new ResponseMessage { Success = false, Data = null, Message = "Image not found", StatusCode = (int)HttpStatusCode.NotFound };
        }
    }
}
