using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Business_Object.DTO.Request;
using Business_Object.DTO.Response;
using Business_Object.Model;

namespace DAL.Mapper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper() {

            CreateMap<ReplyComment, ReplyCommentResponse>()
            .ForMember(dest => dest.CommentID, opt => opt.MapFrom(src => src.commentBlog.CommentID))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.commentBlog.Description))
            .ForMember(dest => dest.UserComment, opt => opt.MapFrom(src => src.commentBlog.account.Profile.fullName)) // Lấy tên người comment
            .ForMember(dest => dest.ReplyID, opt => opt.MapFrom(src => src.ReplyID))
            .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content))
            .ForMember(dest => dest.UserReply, opt => opt.MapFrom(src => src.Account.Profile.fullName));

            CreateMap<ReplyComment, GetReplyCommentReponse>()
          .ForMember(dest => dest.avatar, opt => opt.MapFrom(src => src.Account.Profile.Avatar))
          .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.Account.Profile.fullName))
          .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content))
          .ForMember(dest => dest.ReplyDate, opt => opt.MapFrom(src => src.ReplyDate));
        }
    }

 }

