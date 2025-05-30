﻿USE [HomeStayBooking]
GO
/****** Object:  Table [dbo].[Amenity]    Script Date: 3/29/2025 1:20:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Amenity](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[isDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Amenity] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Booking]    Script Date: 3/29/2025 1:20:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Booking](
	[Id] [uniqueidentifier] NOT NULL,
	[CheckInDate] [datetime2](7) NOT NULL,
	[CheckOutDate] [datetime2](7) NOT NULL,
	[TotalPrice] [decimal](18, 4) NOT NULL,
	[UnitPrice] [decimal](18, 4) NOT NULL,
	[Status] [nvarchar](max) NOT NULL,
	[ReasonCancel] [nvarchar](max) NULL,
	[isDeleted] [bit] NOT NULL,
	[UserID] [uniqueidentifier] NOT NULL,
	[HomeStayName] [nvarchar](255) NULL,
	[HomeStayImage] [nvarchar](255) NULL,
	[HomeStayAddress] [nvarchar](255) NULL,
 CONSTRAINT [PK_Booking] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Calendar]    Script Date: 3/29/2025 1:20:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Calendar](
	[Id] [uniqueidentifier] NOT NULL,
	[Date] [datetime2](7) NOT NULL,
	[Price] [decimal](18, 4) NOT NULL,
	[HomeStayID] [uniqueidentifier] NOT NULL,
	[BookingID] [uniqueidentifier] NULL,
	[isDeleted] [bit] NOT NULL,
	[isBooked] [bit] NOT NULL,
 CONSTRAINT [PK_Calendar] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CommentPost]    Script Date: 3/29/2025 1:20:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CommentPost](
	[Id] [uniqueidentifier] NOT NULL,
	[Comment] [nvarchar](255) NOT NULL,
	[CommontDate] [datetime2](7) NOT NULL,
	[PostID] [uniqueidentifier] NOT NULL,
	[UserID] [uniqueidentifier] NOT NULL,
	[ParrentID] [uniqueidentifier] NULL,
	[isDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_CommentPost] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmailConfirmationTokens]    Script Date: 3/29/2025 1:20:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmailConfirmationTokens](
	[Id] [uniqueidentifier] NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[Token] [nvarchar](250) NOT NULL,
	[ExpirationDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_EmailConfirmationTokens] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Facility]    Script Date: 3/29/2025 1:20:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Facility](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](255) NOT NULL,
	[CreateAt] [datetime2](7) NOT NULL,
	[UpdateAt] [datetime2](7) NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Facility] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FeedBack]    Script Date: 3/29/2025 1:20:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FeedBack](
	[Id] [uniqueidentifier] NOT NULL,
	[Rating] [int] NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[isReply] [bit] NOT NULL,
	[UserID] [uniqueidentifier] NOT NULL,
	[HomeStayID] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_FeedBack] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HomeStay]    Script Date: 3/29/2025 1:20:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HomeStay](
	[Id] [uniqueidentifier] NOT NULL,
	[MainImage] [nvarchar](255) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[OpenIn] [int] NOT NULL,
	[Description] [nvarchar](255) NOT NULL,
	[Standar] [int] NOT NULL,
	[isDeleted] [bit] NOT NULL,
	[Address] [nvarchar](255) NULL,
	[City] [nvarchar](255) NOT NULL,
	[CheckInTime] [nvarchar](255) NOT NULL,
	[CheckOutTime] [nvarchar](255) NOT NULL,
	[UserID] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_HomeStay] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HomestayAmenity]    Script Date: 3/29/2025 1:20:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HomestayAmenity](
	[AmenityId] [uniqueidentifier] NOT NULL,
	[HomeStayID] [uniqueidentifier] NOT NULL,
	[isDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_HomestayAmenity] PRIMARY KEY CLUSTERED 
(
	[HomeStayID] ASC,
	[AmenityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HomeStayFacility]    Script Date: 3/29/2025 1:20:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HomeStayFacility](
	[HomeStayID] [uniqueidentifier] NOT NULL,
	[FacilityID] [uniqueidentifier] NOT NULL,
	[Quantity] [int] NOT NULL,
 CONSTRAINT [PK_HomeStayFacility] PRIMARY KEY CLUSTERED 
(
	[HomeStayID] ASC,
	[FacilityID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HomeStayImage]    Script Date: 3/29/2025 1:20:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HomeStayImage](
	[Id] [uniqueidentifier] NOT NULL,
	[Image] [nvarchar](255) NOT NULL,
	[HomeStayID] [uniqueidentifier] NOT NULL,
	[isDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_HomeStayImage] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Post]    Script Date: 3/29/2025 1:20:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Post](
	[Id] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](255) NOT NULL,
	[Location] [nvarchar](255) NOT NULL,
	[Status] [nvarchar](255) NOT NULL,
	[ReasonReject] [nvarchar](255) NOT NULL,
	[PublishDate] [datetime2](7) NOT NULL,
	[isDeleted] [bit] NOT NULL,
	[UserID] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Post] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PostImage]    Script Date: 3/29/2025 1:20:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PostImage](
	[Id] [uniqueidentifier] NOT NULL,
	[Image] [nvarchar](255) NOT NULL,
	[PostID] [uniqueidentifier] NOT NULL,
	[isDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_PostImage] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RefreshTokens]    Script Date: 3/29/2025 1:20:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RefreshTokens](
	[Id] [uniqueidentifier] NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[Token] [nvarchar](250) NOT NULL,
	[ExpirationDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_RefreshTokens] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Refunds]    Script Date: 3/29/2025 1:20:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Refunds](
	[TransactionID] [bigint] NOT NULL,
	[Status] [bit] NOT NULL,
	[RefundID] [bigint] NOT NULL,
 CONSTRAINT [PK_Refunds] PRIMARY KEY CLUSTERED 
(
	[RefundID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 3/29/2025 1:20:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transactions]    Script Date: 3/29/2025 1:20:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transactions](
	[Id] [bigint] NOT NULL,
	[BookingID] [uniqueidentifier] NOT NULL,
	[PaymentLink] [nvarchar](255) NOT NULL,
	[Amount] [decimal](18, 2) NOT NULL,
	[Date] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Transactions] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TTLockAccount]    Script Date: 3/29/2025 1:20:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TTLockAccount](
	[TTLockUserName] [nvarchar](255) NULL,
	[Password] [nvarchar](100) NULL,
	[HomeStayID] [uniqueidentifier] NULL,
	[TTLockID] [uniqueidentifier] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 3/29/2025 1:20:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [uniqueidentifier] NOT NULL,
	[FullName] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[Phone] [nvarchar](10) NULL,
	[Address] [nvarchar](250) NULL,
	[BirhDay] [datetime2](7) NULL,
	[Gender] [nvarchar](20) NULL,
	[Avatar] [nvarchar](255) NULL,
	[CitizenID] [int] NULL,
	[PasswordHash] [nvarchar](250) NOT NULL,
	[IsEmailConfirmed] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[RoleId] [int] NOT NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[LastModifiedAt] [datetime2](7) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserVoucher]    Script Date: 3/29/2025 1:20:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserVoucher](
	[UserID] [uniqueidentifier] NOT NULL,
	[VoucherID] [uniqueidentifier] NOT NULL,
	[isUsed] [bit] NOT NULL,
 CONSTRAINT [PK_UserVoucher] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC,
	[VoucherID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Voucher]    Script Date: 3/29/2025 1:20:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Voucher](
	[Id] [uniqueidentifier] NOT NULL,
	[Image] [nvarchar](255) NOT NULL,
	[Code] [nvarchar](6) NOT NULL,
	[Discount] [float] NOT NULL,
	[Description] [nvarchar](255) NOT NULL,
	[QuantityUsed] [int] NOT NULL,
	[StartDate] [datetime2](7) NOT NULL,
	[EndDate] [datetime2](7) NOT NULL,
	[isDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Voucher] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'51837800-32c4-4e49-9381-003011dc2521', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'S0U0enkBzfdq1scyvMQJ9OQjZl4WjdBCIdkupds8OyGBu1JanOLL9q3Dv8/gqObiZvfcQytsoKL0ZPostKLg4g==', CAST(N'2025-02-25T09:46:22.9949743' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'e2b6cfa9-e7da-4cf9-8631-007a3a5ee26c', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'ngfpWQhdP94XM5w2fBfGW4p9+280TYiKCIz91B30bBqdCRZSJZqfLg3adnX2mgjv9MpeO3TFKbA/XabIDrr2oQ==', CAST(N'2025-02-27T19:57:42.8405933' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'a136f40f-d2ab-4c45-992f-01a981977545', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'XSGLv57RuDUuU5A+Nwe/SNWyZQ8S6o8HXz0CIRFsETQ+NBuK0f7ZFuqkDubqED4oVMNcftcwnTXbtanMsyZaWg==', CAST(N'2025-03-07T09:05:51.1021159' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'9a963b74-fa3f-48df-8601-0283da917c78', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'Gvvp0ePfq05s1vXa1BrY10xhi0MqyppCImy17aQTSWWUoI47QRTFS8spn4JcNbtdf0NWD60wfvWjpvqcSaJ4zg==', CAST(N'2025-03-27T20:39:31.8663875' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'113104dc-fe9c-49a8-80aa-0286f7503329', N'd87b4b72-609b-4979-b758-7771481da883', N'OTOOlV32DS0V2wl/R4cWcK0TXCLv2PHJhqx2LHNusgwBED4TroxMxcobNWWxEPIbePiY1Rm5cxrtyOqEbUUIdw==', CAST(N'2025-03-27T20:38:32.0701510' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'998f61b7-b586-4772-ae05-035f65743ba7', N'd87b4b72-609b-4979-b758-7771481da883', N'ZW3QXaB2ngWkxQPgVXcjAfFClJ8T7GuLV4RttxycTAZ6mH55FyEXLhNtSBrrMwDaTrmp+xBd2uwvR1nbGzIeKA==', CAST(N'2025-03-05T16:24:06.9928838' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'63064420-cf28-4a32-b23b-03c730d60508', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'FDgJeQTjdFJoigAaixs9IL1SL1Y8MCI/XzLA8WkkEOBQkyaydvZ+pX5EA5DcETVUdYspzV6xiO1lzNUdhFxgVg==', CAST(N'2025-02-22T08:40:50.5356332' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'b2c07ee9-056c-408c-a7a0-06023955cf1e', N'd87b4b72-609b-4979-b758-7771481da883', N'binJWj/qNV0BLYOlx4wamRedCV43/jZlj5M00P2aq23UXD6JfsM4DchF5hZz91IysrSyN+43Vhl4lZWQ4afz+A==', CAST(N'2025-03-28T09:39:15.1319024' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'acf941c5-061e-4823-8b2a-06868881b0ef', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'gDkc9dqSgEkauZugtkvzUKAKusPrKgTiDOebfsvH25PycDIDW4tZzfCwMEJCBt5RQdUfGhLJdGh+JyZuiKrAdw==', CAST(N'2025-03-27T20:49:23.8472574' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'7d87959c-45eb-46df-bce9-06da81c55290', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'3I6Q4yviobb8kV0Ib5awS4kKNGfNg2s+y/jgS1yx+85FUoppGwUxVbgQjhbulDtQ3k6kIfVafKo39S9nz59Q8Q==', CAST(N'2025-03-08T21:52:39.3395968' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'7df489ce-22c2-4964-b8be-0747d45a5630', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'M+amybLerxA1s8R7X8lpGQFvpNdSH73hBU6p49ge7djQ1vprggBKPLg8JdsDih+lvXqED45lzgTbV+2YR0KzoQ==', CAST(N'2025-02-22T15:21:17.6443163' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'42ac14ea-b178-4cd6-9694-0854c8f8f77e', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'znc+iFMFtr4sMMFYICbjCYZMPNEoYF4zAzSYrIOoUUjEUYAEU/ZDnXwO7P6+csVXsGJteaB01Xil4QyE2hrWyg==', CAST(N'2025-02-24T23:19:00.0900459' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'f9caf2bc-c2c2-4319-94c0-0870f0abb21f', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'XFknwgckAmCQhG3uD9WgawqNw+rNtlzXboYxyWkPKJh4XjKK6+KfKXuwqgpXd3QYGJaFarapokfwDAHoTH6rkQ==', CAST(N'2025-03-27T16:43:03.2990343' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'bd19af7a-4986-4987-aa8f-08c8545c6db0', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'VpegpMq7KQ5idmhjCncAPGtG4HQh4o/DUSJk9FB0IZm2aGJBoF0prtZOngfQ6s1XK6hC/RbosS2O8b8rgum9PA==', CAST(N'2025-03-07T15:54:35.1863118' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'8ca875fd-a48a-4699-af53-0a2852e3152f', N'd87b4b72-609b-4979-b758-7771481da883', N'rhugcY0J3TF7MqTRsI3wu82L2xZ/Sgyt/zQ43T1suDXRuKb0V4QIBKSrHOTS9k7y0C4WuP7YzOlcnH03gxbMng==', CAST(N'2025-02-25T14:55:37.3761889' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'9afae10c-4296-4873-9cd6-0a2c3618de3c', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'L3VHo+97ungeZMKx0Pn9c/tFMsTEp3oZ91hSyE3SbTAn3xm5kvzgPMt7V+tfsd3uebEDOWWybWuKbu5Xdj8JRQ==', CAST(N'2025-03-06T11:07:51.3283879' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'beed0ae2-8d93-41f6-b193-0a58cd8dcf05', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'Ue+w20n9Fg1OC0X9TjObHB4Um7tYl+ytkSjBOclQUS4+PBHW5jHICscOabMToHGv/zozqYa49pzLbopyLe54RA==', CAST(N'2025-02-26T17:20:29.1470318' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'8b8d4d59-fd2a-4670-9b02-0aa3713c86f4', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'7wDJutTrFYwwsJUme931tjLpHi0GttQhI3g/1CGvGt5kRhwUEj0mr2xFrVA55008uJaE0/JL8H5q0q4h2DyuZA==', CAST(N'2025-02-28T10:03:49.1435647' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'c46c8a8e-6a28-4bf8-bb5c-0b0a1eb9dbd3', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'7avIrYEoLIcjNmvASMpP3iAH4qfc3qxF+x9TKWVeKJWoMffFnaiPL+2BzedZqCuVuKM0UIG/Ku+wR0YuN6CezQ==', CAST(N'2025-03-02T16:51:24.7587176' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'5ddd364c-fbb4-4638-9c53-0b98d3a9eaaa', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'ZSU3nwYHGIFGwAwftPBYZ2vt98AyS/jSMp5kod201XvW21QIPeh5nksGzOxzd+eei8hH1f8wJTtYV7hJYxBgvw==', CAST(N'2025-03-04T17:32:39.0163949' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'bdff72b8-ce04-4d07-9857-0cd1b6d8436f', N'd87b4b72-609b-4979-b758-7771481da883', N'gmAsIzYELzo+hZFvCDqEHkSmdAPMq5lbtmNryRn5mFwWCsWvINHszSYZGi+lsEd3xhVnLVClP/mruketAFI+WQ==', CAST(N'2025-02-22T09:05:20.0521228' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'31e86176-f48b-4341-80b8-0cf6c1fb9c15', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'sLO9g0Fq7CaOohskzpHqrqMfN1QWWR5E0nYQibUoBXhHPx/G7SOIo6rTAuD1gnS32TIFiulQ9Y8RAvisTF9zXw==', CAST(N'2025-03-29T15:37:39.8676501' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'd4cdf8a0-70c9-4b01-9db1-0d15f74ab541', N'd87b4b72-609b-4979-b758-7771481da883', N'FqROEYDymFO4AvczsySc7Ty5ZBHkslMxiRr+7IbKrLBpx32BTEY9uABujQ3mF3mCrFp+E/vQLzvCuj7cGodiaQ==', CAST(N'2025-03-04T17:31:43.2142687' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'4a8cdfc2-b054-4042-9207-0f167f07bc49', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'ZVE0jUxbtrqB8I5p6bvppMUT8sOXTBRXbw8GrF21u4FpGT+ek+CDVivusHgST71hQrowaHopDESoRlkmpEeZHg==', CAST(N'2025-03-08T21:59:42.0093588' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'aa98bcb9-df10-44e4-a668-0f6b29682f15', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'kxZnvQhAnP2uy8Qx2aZZJfa+B9Wd9trzjwEo3H4VI0PTozBIJgFkYclL57gT5nZQ4/krqWzrZa+UnJGy9A2ArA==', CAST(N'2025-02-23T10:41:19.2760470' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'cd583633-4caf-4d38-b9ce-11e67147dbc0', N'd87b4b72-609b-4979-b758-7771481da883', N'/R+qn64QFmtNMWshaGgUDsda/DdRx9Vrh6d5UQhTn/KpO2LzVP87j6qsRKXOuQj/P0/Cyt3kUfSg3J5+KHOszw==', CAST(N'2025-02-22T11:25:38.4618920' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'94515da3-83d7-4777-bfe5-1221332cbba7', N'd87b4b72-609b-4979-b758-7771481da883', N'MTqHDHFTciFcwoeSVNQv0Ob7EIQh/laldg5JEDCK1RKzZtrifa2zgPYSpZb2MnHBPellisqHjWnQ9RxkIWgy9g==', CAST(N'2025-02-24T23:23:55.8036214' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'a9b03579-e977-433c-904e-13105bce5f34', N'd87b4b72-609b-4979-b758-7771481da883', N'3pV3XX2ZFHKe2SZV4qvngzg0yCNMfzo1Beu7pkDV5rK4XaV//TuXrralzNT9Vk4DfFLQSSOR8esBwJZWMv7xdA==', CAST(N'2025-02-25T17:30:43.3356775' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'28783b50-bebf-4f71-b503-144a54e4f20b', N'd87b4b72-609b-4979-b758-7771481da883', N'yCTfaJMWqfQ8kF8WVhVhrNyxFiNXaEypmmoi8Pj31WeOj+t7bx539tGbbwmoQ8wJ8s8iR+5bF1YhfDjJgwFThQ==', CAST(N'2025-03-26T08:56:54.5699782' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'dec668d7-58aa-428c-a4be-155b720d7d15', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'ASSVr++ePyBtXKWvmNN+b9s0AlPsR7NPYUq0ixFlxjI2MClw13yML/+bbq3xUwe6g8La6LvkjqcZRJHoqRsezA==', CAST(N'2025-03-27T20:25:08.9567144' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'5f958328-fc9a-4752-9012-15893a0ffd11', N'd87b4b72-609b-4979-b758-7771481da883', N'BSctpRPl1tju2fEEtH+w31wqfElpr4/RNzpxRHq2coJzOikOavMU+KlDfTaJRhfli1bOEOTzNNf29jEOKm76jw==', CAST(N'2025-03-07T11:16:20.5086599' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'5c5f5036-71f0-4816-ba4f-1710a4fc1221', N'd87b4b72-609b-4979-b758-7771481da883', N'AuycMtv3IXTeEO+dCoRxv3czyHhPnPkxzZUS0wFX7S47vWm6fO0WImZuUWpzW+URRA1f5/onbV9H99COvG21aQ==', CAST(N'2025-02-25T20:14:37.2777420' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'5f8842e3-f5ee-41ff-9baf-175488c19c1e', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'TmDZFrIvWFt02hY1Vw72Xy2zugNtdELNdw1E+kZvIjZJZiHenBbJXYz36ISxTYeo0et6fjHMQ5qAQIN876hS/g==', CAST(N'2025-03-28T13:14:49.1822257' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'381319e5-0f0d-4c17-bfa1-17703aa65b20', N'd87b4b72-609b-4979-b758-7771481da883', N'4n0RvfYJPMiWAufkZwz5DuLLkxrELDqWKwbyyvzMs5+e0BuvaOQKLwnuaiHRaw1m5lcjz3G1b/VsWwSZl9G7/g==', CAST(N'2025-02-23T10:41:45.7675391' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'57662321-caf1-4154-9fe1-179eaaf6f1e4', N'd87b4b72-609b-4979-b758-7771481da883', N'475mqgWTgB1xhbYvvBMEgd12t0Kknha6TeU6xJMWIIiIKirRcU96vqnJcyXU8jKSoAxM+1FU6lHzRIvw44MaVw==', CAST(N'2025-03-28T09:37:13.8467339' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'0c3e4aa5-bea0-402d-9f74-17cb13f5ebdc', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'Vhd4lbbl6of2heDCIHvWkZp5O6mRpEUSmeU2X9V1oVy6l9TDyfBu5HRnBWBScfwS59ETX0AbDEZDcFC8ZhcoHA==', CAST(N'2025-03-16T11:52:48.6359334' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'fb0d83df-846c-43ee-b1b8-1886409a4142', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'llx30ExVtZ3zswqKAughxCXx1P8C7W2aPjdJrfNpNHuu7G6uh2xHxbwSy8h58VLdcl18ebjD4j3W7xQgewyAKw==', CAST(N'2025-03-28T08:57:08.1227138' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'c38d3872-a1e3-4f6a-825d-189063b43efb', N'023312e9-80c3-4262-80d4-18102e6bdc5b', N'OS5oqcuj2RYpW7GGAk3TsygOxSRqp5csnTrNa6H+0NB5vchcTJwra5u+fg/YyQX47lRheHovswy145pGe35muA==', CAST(N'2025-03-28T09:12:16.5154114' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'ac2339e9-28f7-4134-a7af-1892dc13153f', N'd87b4b72-609b-4979-b758-7771481da883', N'9fqFK1VP7kvgYFuwJJLecISrjavIWnSZTaLm/nJGs7hAicBitcy+Zq1kdLMTKsBdApnadQPRd48dkIxdGrW8iw==', CAST(N'2025-03-27T20:56:54.1580370' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'5711d4c4-8130-4a70-a44b-199d05a39e91', N'd87b4b72-609b-4979-b758-7771481da883', N'cY0r6ZebvcnFxvbgxDZzYLS9NmSJGZfjjL5rbiYJw+u46Co8eMdKbu+213oiyC1aHs1uj58KdHr5/l1urZpNmw==', CAST(N'2025-02-23T10:39:01.1883092' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'd616f48c-6153-4ffa-9bc5-1a1fe0f81759', N'00f32ad4-aed9-496b-8e09-13c290124c28', N'DAdtVQelTegycRLyOUQg3echXqEw/wD5yVoInxB9teQhxUX+PcVb7xtGZmGUX2HjZ6OZPGYJogiGXJguo6hiow==', CAST(N'2025-03-28T13:36:41.6655654' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'f7ae17ce-d2cd-4bf6-a2b5-1a4a18483126', N'd87b4b72-609b-4979-b758-7771481da883', N'kCtWP7wSuzXuCt/RsTJoMccsuOhkl3gIRQdfoKhY6EMLWFx8TOqiWyiKTkxfls7z+bu3GcfiTCO/V2nCLvpqjA==', CAST(N'2025-03-13T11:30:14.4660547' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'6214e036-fe9e-4533-b7cf-1c3f949d708f', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'eneIbbhVRI8u+Q3H/qpQxTOWM/eZ8TAOp8TqOf3pxCdF91rPsADynWQYqlh/Ho3E6jG8VkCK8FIwBbbKzab4bw==', CAST(N'2025-03-03T23:42:19.1365635' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'5a4335b9-7b5b-48ae-95c4-1cd084eea7cf', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'TEBr/RzWHvPFF1gCxcMs//wMIcMW1OFhay/Zrx5MzSar9rmIUrCJjdmegpYhGPZGUriziameEPMN7Qz01N+rWQ==', CAST(N'2025-03-26T15:32:39.4853716' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'3e95ca68-9e0e-446d-849b-1d1861c34e32', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'c4+MEugc3cIznUrDYDY7q/NnNViTlR477UXCYQufUgQtqFx5B9zzyXyxOZDwe0QZXJ1LcAPOSbS/yN1LDEtasA==', CAST(N'2025-02-23T10:37:13.6657256' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'be8f79d9-4028-4729-b0e8-1e1b2efb347f', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'k2CnGVkT62bwi5zt7gBYpzYwvZQtBmJRrhYGfumvTliNZ/6PJmIhk3dnsfUDEHa9XOHwLloPZdZ9/dqkk9Ulow==', CAST(N'2025-03-07T13:17:19.1508611' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'a7e8d2d7-012b-4d90-84e0-1e447a79a4d9', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'7AQ60kCBRdb8sMM+EFIKb6jj931/NYmFJXBbF4YrU272BhzaLnZzLnpcnUAHSRhoaAxtJEa7pRUS3dMrGQdT1g==', CAST(N'2025-03-25T22:18:49.0831080' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'ec28aff2-b3df-4842-a25d-1f7f9f8bbf89', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'zhKVP9qWVIzPPIiXrm69BC3/6YObUI1Xd9+OWTa35wMR4aXyprGSqbxJlo3YKUHAUK6WgABlxr41Vxx8AhO/gw==', CAST(N'2025-03-17T15:53:57.2056224' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'41ee9f75-e39f-40ce-8ed4-1fbc898bcc52', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'ZPy+tGvAxgEw2tA3fZAPp6Jvc5+fqYohuDKWx+KHiC+nveJdHS9FA8h5s2D3TgfvnHAIcaQhOkRWSgoecQiRuA==', CAST(N'2025-02-27T13:57:54.1191945' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'ea8d8c1e-3314-4bc5-a809-1fc61e277929', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'twWxxPdFvcNgUUM0E9L0aaJ1EqBLtXQgWiojMeDjHMV3QcdxG/HUgBEydLpqTB8hrHdYd5+I5AcFxXhH8VJv4A==', CAST(N'2025-03-06T13:23:59.8265613' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'b4ff1dd5-dc3b-463f-a981-1ff870d74264', N'd87b4b72-609b-4979-b758-7771481da883', N'QFu98rdiKiiocqBBJ/FvNzjowX1BzCJiTO338LhoKgfq8+7gfg9t/N/uwJAJNWEjIN5tMpGGKWgcCj43o8Wc/A==', CAST(N'2025-02-23T22:49:10.2574942' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'e50b7d34-ddea-46c0-8dd9-20065a6d5894', N'd87b4b72-609b-4979-b758-7771481da883', N'VPsDwIlYxXAkWqwLYyZu2UsWZ5zmtxsZNUHag/KIlXm1lCJT/6846qwElKmpH7J8JzOT9XoRAq58aUoTM8eghw==', CAST(N'2025-02-24T23:27:57.6138325' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'b54c9ee4-ea04-4880-b1f3-20113b81ef67', N'd87b4b72-609b-4979-b758-7771481da883', N'3AUQOviYFlh9RcjrSMPJygz5Imv0QCSlIVldD2wCKlEZ5MYDCrZL5ruINku/XOhACVibfNKl6NHWcMBexvEOCA==', CAST(N'2025-03-16T12:06:22.8282087' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'7216864c-d1a5-4df5-b4a8-20bdc6e27994', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'lMjhUdXU5g4I1BNsV8Q9W/LJb2QSWQ4IsEiAmAl6m/2oBaerbCfy5c+Csa1ZoW8/eWeWDiHOvUFQy1CTrinPag==', CAST(N'2025-03-25T16:23:14.7030675' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'452307e0-cd9f-4b79-8ab1-21b1e7bfb3de', N'd87b4b72-609b-4979-b758-7771481da883', N'2RWHN8agSz5LIVOpV4f/jSB/1DtCZsgqUEFwfOk6AUA5Tuyvl973IXAk57VKmEtsXt3+IEj9bn478uCrWcZV+g==', CAST(N'2025-03-02T20:16:31.5816803' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'91aacda7-ac0c-4149-957b-21b9e0d91407', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'HtYBxmmx1QF16wZuUD1hlzOR2zrEtxvmKzpxVMbChYngRyFbhlrN1L9MnYVU8Fmp/Kx+987GZ7k4uW2JFmrd5g==', CAST(N'2025-02-25T16:55:12.7402427' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'962687b0-9637-4c7a-ae8c-22117a8f14e0', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'e5MztE0WNFQmuZs/XxogS+LPmoOQXOtzBLB2EeCgbq7ip7kaw2tDZwKpS8ZLLzR2G6fGwcheE695MOx0tCQiUQ==', CAST(N'2025-03-05T13:18:14.7620775' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'999d16f0-ba08-4b46-ad83-2335bc474c8c', N'd87b4b72-609b-4979-b758-7771481da883', N'6y+8jX085ZnDGpSFjAf8/749sa5aHjbJmdUcMEHCJM15qO0kGgxqCi59e4fZmiZHCPMwJDYT0KL+MF8a7RRHMA==', CAST(N'2025-02-27T19:57:02.8937388' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'3058b347-fa70-4556-9af9-23fc7cdaf129', N'a0f49e77-2239-4dd7-80d9-156d6769b0f7', N'td3Q+IQLs6y0f+PBcf2SKlWg9YPHjTNc/gaqc7nOnBVhr602yLybD9a2CMR0bQsX4tShrgDV2NCaNv0VBDwnNg==', CAST(N'2025-03-05T14:24:07.8457906' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'bc1a6b44-6585-43ab-ba6d-27c7b0b94898', N'd87b4b72-609b-4979-b758-7771481da883', N'K/e9S9Ws9QivcEk72e4Yanygejh0Z+xI7Obx2SJopr6gondMNfRCvYYlKi9C8KT27pjxHYHo6msuUDjlXFrViQ==', CAST(N'2025-02-24T23:26:38.5894258' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'ddd6d524-940b-4195-ba04-286abb341523', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'y5TNFrhwI+nHKhmoOkONcgpFx06JbzjAHYs9c7Bl7tTKkdWlOlAj9EDdsvKAPyZ6Iy+3WzsK7fDnZbbbH2dF8w==', CAST(N'2025-02-21T10:34:57.2367028' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'6d60a682-2cae-498a-81b9-2b5bb7c517ab', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'faVqKgSUgaEh2oDR/l+u2fUYYL/JEAaYrggw3GB1psLIk934HQe5tMI3JQp9EmqM/B8C7hkB3C1g/MmYsYUt1g==', CAST(N'2025-02-23T10:45:53.1293900' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'0275b385-6480-4030-9f07-2bf5cfdbcfc0', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'tbd8okZhKiqf1BkS2iUelFQmQnwdLeWV5jdBhmaIfBb2fhiLCTbbCpcJfd99CKACbdODHZ70JGLuVD4ByUVlFA==', CAST(N'2025-03-08T21:58:28.3062321' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'f7b105ee-0b64-44fa-8e8c-2ced9bf8de86', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'rn6Z7wg6RygC6woiRULbShkLBFjeRYalDZZYFFGNVooHjXFKXTll92JYMl33BQJSjsbTH6QSphG18Jpfq7TkaQ==', CAST(N'2025-03-27T20:29:16.6024910' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'1493edb2-32bc-4188-93a0-2e217ebc8984', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'BevNl4Spui9X1FAkeDV+htsjfG0WdyWywmn0DeSH+gNy36qkvP0+j973DsisPlu+sDp8r6TvdMPAo0EiNXglyA==', CAST(N'2025-03-29T14:21:31.9029574' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'6fbdc1b5-8119-4c35-8fb7-2e7e79767e30', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'a9gMWGtqKzSLiA/eJP+iDT8hgbHnjLWRzDd3Ci7vckAL2JSVlKmMsYz1CtBvTUoF27zQ8tQHbpqE7m0K/lhnvA==', CAST(N'2025-03-27T20:29:26.8882870' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'dad5972d-a751-4cb5-945a-2e9d671b333c', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'bAWyDeI3w7zNoB12Ila2PHdFZvgDE+jFL2K7GhAdxB7i2JzIGT5wWrYxNPxY7YWAKzePHMZnrMHC/BP0GOum4w==', CAST(N'2025-02-27T14:10:31.7488560' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'88df5dc1-a649-4f51-b924-2f44aaed7fbd', N'd87b4b72-609b-4979-b758-7771481da883', N'oT3c0eOvJg6WdGC9yE76yU80itI+zhXui9qgs7NDkqiLW1/i4SLoP7DA2HdhYahqt7Ncw7zrDhjzZxdRbCxwaw==', CAST(N'2025-03-29T13:51:15.6176790' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'750f9308-c4eb-497d-b1a7-2fbe9a8708df', N'd87b4b72-609b-4979-b758-7771481da883', N'oho+f++8L0EXrdww7Z38h+dmsPONUvF/5v3+wNpViNuzEww8NESrrKB4iqKuCiJojx9b2ZmrNxW+TmMmzaEWCA==', CAST(N'2025-02-23T10:35:50.7223991' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'25007572-19ee-4f60-a7ad-324f8c74edfd', N'd87b4b72-609b-4979-b758-7771481da883', N'RqFqgCejx6XsSrXQIQRLihKkFgAeUqqdwsuICX4fzosjGqpw/hM3ST7vAgf9BrdQhyZtWYjH+frSmJcaQyGd3g==', CAST(N'2025-03-27T20:48:55.0539438' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'0db16001-9653-47b8-93ff-330a1597c8c5', N'84c1a775-7f5d-4bd1-b8d5-e42dc1172f76', N'bCZL0sb38Crlir9VWiGunC6NOMHRWGrrNmJ0xmBlp8PlrNy0+rImlES3wTszY6KP/L+/YtE9xCrf4guVtRLw+w==', CAST(N'2025-02-20T21:54:17.7162851' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'843dc8cf-e7d6-4954-aacd-335562fd7d47', N'd87b4b72-609b-4979-b758-7771481da883', N'bgM3qNEJN0vIj0jEifnjqFjegcWxFyCeDX+7giE4nWsHnkClgybtNIex2y5XxC4YGSWMcgGxQjMdvJm0wC+vUQ==', CAST(N'2025-02-25T16:44:58.2135616' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'5fb58d0e-856a-4325-94b1-33d6ae141594', N'd87b4b72-609b-4979-b758-7771481da883', N'MYph7JpjMTFs/30HqhIS5bQ4SkNEc4aMeK+rTxG2dffPGRCxi48+HJ5BY5Gdd/wtuJlEOJd+is2eCWg2+VJICQ==', CAST(N'2025-02-23T23:37:41.1960714' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'176c4f63-1a7c-4598-960b-3400cc2eb9a5', N'd87b4b72-609b-4979-b758-7771481da883', N'+9xC50zNAFtp3MTfpR+5j57mI9MHpGD76YB17O4iPDf88ozyv8lobxcwfTdwQ3ap2xt00K6xAjoYf/pb/5dodw==', CAST(N'2025-02-24T22:14:04.5301584' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'941c9676-99cc-4437-924f-35122e8a9b6f', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'zdMGWwnmJah/0m2Vm5cshY6pEANnFOeFgTXT+ojFDdNs2zBI1lUlEQUjVVjktfb0mfUhYr9cB3iUDpk6D0rqOg==', CAST(N'2025-03-28T09:44:02.2489990' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'd20affb3-8e81-45f6-81fd-3515cbc460b2', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'ED+oWw8MPMzaOUfUaS0AJO8ufHQV4t6nMQiju85TvG2H5e1ZAB0VXTki+CKSgYo+fhravtiRvjO4xeQOxE5X3g==', CAST(N'2025-02-26T10:26:24.8868246' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'2a8b5f03-ae34-4e3a-af08-35ef8242b947', N'd87b4b72-609b-4979-b758-7771481da883', N'p5Tn2EuiCx1sHzJAhR1mBxuoGSyFMTmk/XuA4mY2s1RRBimLDhCvEfiPSIAKiQipCKCEX9z/QGtw7cj0tlVPGQ==', CAST(N'2025-02-27T21:42:49.8625120' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'c6a8b894-d4ed-4d50-846e-36a9898048d9', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'eMFYKmb++kNd5UOumg2csfSS6UjbO60mNdLAU8OjEkrRIyDdDgtwIE9nAtXTs/oXKLkj7Kc99YnorGf6HkzWQw==', CAST(N'2025-02-24T01:31:05.6037413' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'b7e5b9ca-32dc-4499-bfd7-36e06db7af3c', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'g7K7HZqA2ne427bsw2bALjuBYtBzu4oouWhzFQ1nBZQIPIQfCGYcORFJZtx+g/8h/mne6j5DK1fCI2vmzu90tQ==', CAST(N'2025-03-27T20:47:56.0994459' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'f2731af2-8fc2-4922-9b65-3746b4dc24e8', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'BJVysZuyO3avRVEZUFiIJLxGdHQbTADiAD/0JiJTmRktqWZBYxyXGrhi/Pi0Kx58kk6xCqthHxjTrw+RQpp7Gg==', CAST(N'2025-03-13T00:21:16.3765157' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'c54af2be-cb72-4be0-ba0e-382f7f041d47', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'IUxb5fgEwvTskCcyABgx5THrNqzyqYpyQP/b5kEoTChnp7zOYFoZqz83UtM6QTOGiP0V/WvAsgww71d+AibRRA==', CAST(N'2025-02-25T16:42:00.0109297' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'6c618d40-e35b-4e5f-a0fb-388936792d87', N'd87b4b72-609b-4979-b758-7771481da883', N'e2wTsOZU9sACWTMUldV2aCIYbPR4sp/nC21Cl1E/M734jkFZY8daP0wn+9hQC/LnyzQDeEtfseTdXF2MHZBbcw==', CAST(N'2025-03-28T09:55:50.3590085' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'18ecb011-59bc-48c9-b36e-3954d5a52708', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'5TgAGYzUvKJ7wab9+pkW3ynWFqYkQr1zHrYNPPf+NMQc+xYxrnvuVt7IEA+7sEfMjCF4f+UPyVS40DTy13mjww==', CAST(N'2025-03-07T10:11:20.8438327' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'4016fff1-ee4f-4152-a662-398e1cc49251', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'ChFRat6Ddfe4CKA6OZmiXI5S3mThJrewPMLLVmaK9X9siGCN+wep4vaRIb1S4rYHs02gFG2M19FJ1rA5RG9O4Q==', CAST(N'2025-03-25T13:31:34.6824530' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'd5c60e89-54b4-46da-8786-3cd60538b4bb', N'f47f805a-17e4-4b75-9ad5-e4e07e011142', N'jKnPLRdKUDZOhWUhoMkMFi2wzS8zNLjnvQQF5wslnHnC0MCqRyjHtWUh6tcfx02X46Gv+Qsg+3bkWVU7TsKQog==', CAST(N'2025-03-28T08:40:48.0623552' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'1914a660-7f94-4981-a4f8-3e17ca79da84', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'cMcIYUtdtmHt40XAV4h91fhoT23+FjxXY8/Qahxujv/NYBOjsfZh7wFowvQpbZdoh3TesIUyqSTCJPXmd+hbrw==', CAST(N'2025-03-27T17:49:59.3065060' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'3e1d1f67-0d8c-4bc6-acf1-3e9a7462e577', N'f47f805a-17e4-4b75-9ad5-e4e07e011142', N'huH9IUdHtoXop0IoAW3pCb6VI07tv2QBE8ldEtKkzUYxkRlCSBoW4NKJ9LV5dA/uNnHHLN+sDC4LZlI1ZVqYvA==', CAST(N'2025-03-28T08:43:11.6984029' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'99257281-9510-4541-b7c7-3ebf7c8eced3', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'rQdo6Vo71gT1TrGFkArmFUcXw/4cLLfAJ9QR4KS1Hi8JQF1Ob/L4gSdhSdd0TPk8xpF8U2U0JugqXViQIvp2pw==', CAST(N'2025-03-07T11:29:05.9221608' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'6f188113-faa7-4c0e-ad9d-3ee1add4baea', N'd87b4b72-609b-4979-b758-7771481da883', N'qBp0ysOa0LSnmM5sN11a2uFchHGqw+9TfvQRf7p61WVW8itzH+nAlCtW2DGbk7VYNzgovOLs+GHqL3+ycmtlGw==', CAST(N'2025-03-03T23:05:22.8168216' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'5279213d-f518-48a4-a361-3fdf3042a949', N'd87b4b72-609b-4979-b758-7771481da883', N'g+4axqAs1Gr/l66t8ZP4znBt11N7pruF2JUotfcl9850fAbMjfsBd7mUR7pgCzCAdBbifR9GIWpafGX34XyxDg==', CAST(N'2025-03-05T22:02:08.7519046' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'8a6c5d06-a5f6-4764-8d06-40de7f3b67f5', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'YADR/UNoXLtsU4n7tufWn4XghR4bQBCU7wdLlEszWlny2EjXU1sYSm+LpO/WS94PY7doMZkzB2l24SP6sYw5Rg==', CAST(N'2025-03-03T22:57:16.0410738' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'6570b1b7-f886-4da6-9e08-410574d53362', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'nHJ83SYqBG/Iw7Ar6edlEeF3cfmQKyJQ9vX7boqSfuAL1jsdL5l0nfkaPUr7631Lrbc30GORzoFhxCtW5ZCStQ==', CAST(N'2025-03-26T17:37:30.5215690' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'91df62a7-3a00-4e0e-a2f7-41512114331f', N'd87b4b72-609b-4979-b758-7771481da883', N'2xEF4WF3PE3DHMTQ8k3OrF+XGRNdmZZE94UB5jBTOsh1gPtWSzB0qcRLI7C1M6NCgvcFycUgHE11TvHiGljGxw==', CAST(N'2025-02-16T20:52:57.1327380' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'0feceda3-64b8-4141-be85-41c7257bc8d2', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'vk+UatNUSNwXezaYeJbQiT+ofRzqffFfTbnAH33lsl5ojtDQGHrfnHunyhp8xwxo+JvnCj9/5TlQRqQxpUG9qA==', CAST(N'2025-03-17T14:23:24.7693236' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'2d0db0eb-05fb-4880-b5c5-423061697fdc', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'aX8ZseZ5ZYq09pbIff3RTJvlYwWY3z1UcUxwVqcnaFXzeqZGjwzaoS+9937nGGheyuLCtF1PLL93Pqty+CfNzw==', CAST(N'2025-03-19T17:36:59.9715989' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'2bcc205f-5c60-4029-97ad-4283b708f156', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'yQV+6+Musr1Htl73tstsJ59cKSNorGLurTS11E4CacCGhgARI9RGYUCbjdkKgWQi6lekLw6OcEIa4ayNEV22/w==', CAST(N'2025-03-07T10:25:45.2017707' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'abbe954d-60a0-4ea0-8104-42c6181061d3', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'JQeGLSEaWSURuRwIq1N4IE1ZO1Zzf08w6hyVHVOfdLxso7bNyEQVRLyDtxtIB6ayKpTyoP1owpSaK26foLRS6w==', CAST(N'2025-02-21T13:49:30.8243606' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'b78c414e-e518-47ef-a0fa-42e6e3077599', N'd87b4b72-609b-4979-b758-7771481da883', N'CrqsC4KbaKiQCDT+0AVDS9WIGn9J8nldJvmtCC4o74lXr1NoltqrqtZCsq6AwSJFAZfCcbyNF2rD3hPzqulO/w==', CAST(N'2025-02-23T10:35:24.7141445' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'415d33f4-69fd-4b10-b194-43398f3bc829', N'd87b4b72-609b-4979-b758-7771481da883', N'Jz0Q37EI5jOeyGXSGgQ534b0Nxry5OtlruTPz8XCsN9Jxxe8Lt0lXLDVsQvhSwaVBJvX/wMAMdyb0tkzaSxOWg==', CAST(N'2025-03-05T22:48:27.8802978' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'e7893aee-0713-487e-b1bd-443adcc84650', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'hNp9nI6Qe2Y1//sOqofUTUtsFh+9Rp0+TskIHaExf52/2GFzzXTsWR/tq1L8IQIMu3GQU6hmT+wEXNsIisi+Jw==', CAST(N'2025-02-22T15:20:19.5598513' AS DateTime2))
GO
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'20fffe19-fca1-4fc3-b97d-47b59fc975de', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'dccTjnopsrSXfYI5Kb4wk9SE4+wBJkxirwcHW+nSfnURK3+UUj/TAk2BUzssX3SI7lNz0PULBRSTtnyV6DM3Bw==', CAST(N'2025-02-26T16:26:23.6886413' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'e553dbdb-5fae-4e41-a9e4-48027f6eb046', N'd87b4b72-609b-4979-b758-7771481da883', N'w4N8Pgh9hVYEXq/Me6Qq3zLgUIwQnYQ4FFBc27utG8mgMv7YMGM3OdkqSKLPoXmx9uYFb3HvEnY6IZp5ImdXMQ==', CAST(N'2025-03-12T23:14:03.0760206' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'24a64b31-7542-48ae-ae01-48aadae4bd39', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'EzFOcFFKsleJKS4UrQIyLNERcuvLTnFpFRIGOWLQU9FvZqFxxZG61XMKlkuHr84A4EDJ4StykjHXJ44HgZfacg==', CAST(N'2025-03-13T13:42:24.3294065' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'6a9d90c7-4ced-49f8-9c41-48e209e9f7c8', N'd87b4b72-609b-4979-b758-7771481da883', N'L4lERt5uV/+qfxJEHnZ3/uDu+RluHLiw5/FvRh7TnmrxT8qcPMWH98+dw9Y/CeBHRUCKLT/qLMbUiRAOAvJMVQ==', CAST(N'2025-03-27T20:24:49.6120762' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'63d4d265-0949-4a83-aa93-491b5110ed37', N'4b7b0200-70f9-416a-9a3f-29ccab0deec4', N'TTypHViKjUpBsm0kVzW29fUa6XveqnIoczZPdSdyxGa6qKzGtlcT4rfMamtv5dOa3tNvGoaAFsDddYkrJcsfwQ==', CAST(N'2025-03-25T14:08:51.7461905' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'6176d83c-c080-48f5-8106-494292faa05d', N'd87b4b72-609b-4979-b758-7771481da883', N'ub6lmnydLeRsZSa6FuJ89A/n0ed+RKoLjp89+Woj3ABBF5E/sF/B8eMYYqpOFDZ8p0TzuX4RRp24t7vL8HZeCg==', CAST(N'2025-03-06T13:30:21.4969410' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'a688a0d6-c5dd-4553-a5e5-494c833b767f', N'd87b4b72-609b-4979-b758-7771481da883', N'uwi8ck4mfHktNpWZXYho63vVaX20De3euo30VEVJP9g3Zsece3PXElvMSszTHda3vZPsP5tY4eHYkkrprWP1UA==', CAST(N'2025-02-23T23:19:21.9156367' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'938e132c-03a1-4cd9-9fa6-495daf4486eb', N'd87b4b72-609b-4979-b758-7771481da883', N'qLa3+U33tySveM0FcWxFPU1ra1wQnmm6gNrMJ3z9njUwEjU70B1EtoS2P6brfnQ3G6t5Ycv70QaM6aYMQuWB9w==', CAST(N'2025-02-28T21:49:27.7096899' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'52df1a1e-450b-48a8-aeed-49693786cf87', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'tUTZ0pkzOVEX+qbxBOcyjebzda9CAF6eZhp2oEzi10Wng8ZnRYRzotAr4+kWpP5tA5pcSbY0d4U1avK1JKcvMQ==', CAST(N'2025-03-08T22:02:17.4735938' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'9b39aba0-012f-4182-8850-498205f00d54', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'Yxp3l4UnpsXCv9AZ5Ij6wHe5xMEqMeYsNxyl/GRvUXwEwqxYUR2G8Bl3tL0I4ywaJHy9KC56VmO36v0Vst/GGg==', CAST(N'2025-03-19T17:49:08.1640838' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'e477a835-65b5-4c8d-a57f-49bf8ceaddb7', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'iQcpJnMbmnvS1qV8cZZZ/IVVP3oJrLWUt6ocXHUEjDe+v4w+M+3XCONzM+oqgSgRSo0g87B7uFsfgkAPO5szUQ==', CAST(N'2025-02-26T16:01:28.6784214' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'95d094e7-92ec-4f83-bf29-4c22ad18048b', N'd87b4b72-609b-4979-b758-7771481da883', N'5Hkfv6S8JSV2lfPwDPvNiL8+1xVhBnY8dU3Jhh1LST5lfAgPhW3i1LGxU9qQfCp9g1Nk+iZfb0rkK5crwGPjfg==', CAST(N'2025-03-27T20:46:27.4493603' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'7871b448-ab38-4218-bc67-4d3e97eb9ec5', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'CZTKBGvruUboyxzGzQOVhWX+y5pvCiHsfjaluvuSw25a/t1XvhApOCOcGHshXBbhTGjHFItBfIsn89A2yY54kA==', CAST(N'2025-02-27T13:31:42.8889073' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'29b1fe8a-569c-40f0-b0a6-4f38433c466b', N'd87b4b72-609b-4979-b758-7771481da883', N'1CSu3bXvMXMYnzWWHqU6X6hCGcgh96JYf339XdKFey8MbX4kqlAqTyJDDDiL4d8hZcr6fRFjuuhqaEtHjiVsEQ==', CAST(N'2025-03-04T14:34:55.6948904' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'cdc33fc8-0d91-4739-9149-4fd953784e27', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'XyYJz4lZBPY5SgAKxt6D0+FFbsr1uYtX+3xygrQeA3eNONalplkwoQkCd0M2nhp/Ar6/OtCyPxN+6iIXqeoDlQ==', CAST(N'2025-02-21T15:55:24.9122497' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'336c1d6b-230b-4dfc-b97b-502a71113f64', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'S9zifIw3zn9iA8xinhbI2Soa/prjqZK8XNDAp6NRiKx/WOsKcklYmBXGks5b1DzpXL/9nQiL44b9UeVFR0Hp0g==', CAST(N'2025-02-25T14:41:43.6487252' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'0580ce17-ef55-4229-9fba-507972ae6630', N'd87b4b72-609b-4979-b758-7771481da883', N'JIRYw/lMjpMRqAwISsUzRqAD/3btuNL+IyqbbH0Xvz/w1ll2dJVscnkA8fZ3BEPwkv4J+16sQk4SaovRRu+toQ==', CAST(N'2025-02-23T10:46:02.5889092' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'dcccaaf2-57cd-4ff1-b687-50bdb8fe10f1', N'd87b4b72-609b-4979-b758-7771481da883', N'zjSFgLrRlX9GfzHh5peB1Fbmp9iCis9HNwyIQJgd2iEvZkld8OAgHpv67SGc+MwrtZrWFXJs5pgq2hki3cGkCQ==', CAST(N'2025-03-26T18:15:51.0063896' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'b43e7a17-a52f-4c47-b566-52bb4b3ff85c', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'SUweQ6feexlMiVTRzMOKh6hg9IKHtpe587CB10C9iwGGMKxJQ0JTsdr7bEjbidPlaEq9HHtWqSnl/npFRTA3AA==', CAST(N'2025-02-27T11:45:19.2190960' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'8c7450aa-4396-4852-b93d-533e35bda388', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'nFD8xcfKPuYyEmgcuvwXKaiuXso87dLiC9COoldUPGxyb4n9zH7qKK+1xR7FFEBghNUVbs6glhY7dApK6fwRVw==', CAST(N'2025-03-30T12:17:39.4317008' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'3aad7f49-eb5c-4a85-9dec-53841f4cdd98', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'yrQ8m0xUaZ6AgRQEh/vjCVld57OmwS3GjRS5BuQq7sS/9GqucHbvUACqNNyzZBmH7Sjelma5ZAD01oPKmFE7bQ==', CAST(N'2025-03-19T17:40:16.7673521' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'5ace818a-407e-4cd5-89ca-54406cf48dae', N'd87b4b72-609b-4979-b758-7771481da883', N'hZF9wsatHIYAoOWBbxojsD/swMn6ptPNdcZtADbBWXQDSqvpN0BuaqhLllDogLvwptYdpA+0Lm4S/GpU8sKXiQ==', CAST(N'2025-03-08T23:02:42.1864484' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'a9b68ef7-6573-4331-af5d-5457d7199b8b', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'LmAYOkthpMfwKJvhsjRFuj3rxb4OTS4e3UvVJPJDF57Dr2uQ7ZVr9teTKCtJNcMKCq+W1l48p73krxRY1+dTrw==', CAST(N'2025-02-20T21:54:41.0731482' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'3ad727d7-078c-4c66-8ebc-5472ea034376', N'd87b4b72-609b-4979-b758-7771481da883', N'dCcBzsgq1MVqP8ax7WjY0Snx2G2LKVhxwuRr+yZor4ftFSCf2KCOIF4wfWj2yCM4WVVQoDGno+mK3KGc/awRYA==', CAST(N'2025-03-02T22:37:48.4374093' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'3ab27d39-9718-4007-9316-54df32d5786a', N'd87b4b72-609b-4979-b758-7771481da883', N'M7fzrqUjgpFHTq2jMRGlOcZ78bP0EKpZFhmWgQiLetUdXyT8ZVeMUTpMl0094vIwS6o6OfexMFBipRh20mg3FA==', CAST(N'2025-03-05T22:49:32.1374411' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'f1252b5e-1f3a-492b-bbcb-5596a16341e7', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'GjlQkkdvDKz68Rd7mWypxEtK06RvJRtcyOZEBmyHFx4V32jhwqMUVQHBCVbQYTXD/FFSHlBRXfybMPcewTuw9g==', CAST(N'2025-03-29T14:10:18.5080834' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'2611ff96-68f2-487c-9c34-584d4d18d8ca', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'1Lw+D154cTg2CY5lmBLdGzofiaHTX8rVUyY6/D99Utz3XqBl0tFwSyi+QPLLBIlCOAa0iJR3JXqUGL/B7wITxg==', CAST(N'2025-03-07T21:09:55.3678108' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'733bbe6c-fa28-4211-8e2f-59868ae29fe6', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'M4SrS8liSGYEi6dzyu0ObDZV2lFjal8K7wuRu7VPXfot4DRAKtAc4v1fmh9tuzsvHYKxw4CEuo/ajCCIPRf+EA==', CAST(N'2025-03-26T18:26:54.4945966' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'07346656-7f4e-44ae-a307-5bf7896e3a63', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'SUw1R6/cL9GzuW6tFF12O8AiCZbXIi/jiUjFAYed7crzGrtPbv7sGNVVrDsN1JUMuv78wPd99Sq4EYg4/r3AKA==', CAST(N'2025-02-25T16:19:08.6082285' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'7f320277-bc44-4d7e-b348-5c1993fd7d26', N'd87b4b72-609b-4979-b758-7771481da883', N'zyJNw1hkCr//ZbEbBHfEwnYOXzFhbhoFYKwKSMt5ceU9zJTvK2mNvi0SxCdTpOM9qYsmQI/qfLYr8CQRQjO/5A==', CAST(N'2025-03-02T22:38:41.4057289' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'102cdd53-42dc-4f70-a81e-5d2156d644a2', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'Tll83vOEHWAA04D0nMwEFymc8+FzhfMNI/5sT1uwQ1sYX5yc+0Jm0sSruP5o1EDGKoyMTap7Hejg9hk3Jax5yA==', CAST(N'2025-02-21T15:59:34.7946632' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'c86fbb90-6e5a-46f7-b677-5d392124fb42', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'dzjxk4bKhoMVT1tg/GELKZ1pe1oLfi+oZKnSU31Jx7yRo0i+Ih9+22UuO6WiYJ1P/q5nqHvZxWxL0ZI/sPBzFQ==', CAST(N'2025-03-25T18:07:11.5417130' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'30c50d77-da74-4e8a-b187-5d8a41e3ad9f', N'd87b4b72-609b-4979-b758-7771481da883', N'f9VH6HyR4EFw7sR/EtIqv8rcOiWQrwu2tJY9KH1EIY/49LEiqSd8W6U08kfvbgJeN3/LbCy5ROb4/YQc76BcKw==', CAST(N'2025-02-28T16:44:49.3613889' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'fc11c005-32e6-45fe-a45d-5ee087055bda', N'd87b4b72-609b-4979-b758-7771481da883', N'28fEhGoyGj7T/+L80LW9tQqFMRDr4lrreMaw51hO9tc5fl8+fOYU2Xt6zVO6Ele2LDfdcPMvza91OkYNN3WsDw==', CAST(N'2025-03-07T15:55:38.7670809' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'91089bcc-46e2-443f-b01c-5f9c2677b5bd', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'q4s1afmTDGYGnLvMkRLTihVeIZq/Zpe9U4GpD39dviaFXDTFQbJafAkOFk2ZyUaqMRAsePZT1hSHsNwV7chjGg==', CAST(N'2025-03-25T14:21:23.0992580' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'fd6f6f3b-16cd-4e7c-ace8-603ffb0c916b', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'XeAUdYTjOoq7v9IPY3m7J7fGfASrqwXyTGV3hE7jA/p8H+sT4pWLae50d/gHJbId0QkmrVMzuwSEUB6caBVEpg==', CAST(N'2025-02-22T15:17:53.3915083' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'f60c8d24-276f-4e63-8245-614abe310269', N'd87b4b72-609b-4979-b758-7771481da883', N'W+paidGHbDNZvfATCWy4w/9MJmtNtlmeUppd1BzXtJIHcFA8SyZIVNwjeUxIOeZS65d3fYBYqSerdxMMXC+w1Q==', CAST(N'2025-02-27T20:18:51.5603291' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'8b466122-ec51-47d7-8e4e-61b0c2183759', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'8D2LSHIWwFS8N9+S9sauNyanKin0/wCuIk0ef/K1t1a1KgTfgXKS9Q4atNbhvMd42kBQAIG1znKtovQI56BS3A==', CAST(N'2025-03-26T09:33:39.8813027' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'7fe172c1-890e-42a8-80bc-61bbbc05c99c', N'd48d2dcd-7083-4395-8486-4375f6ad0de2', N'5Ux7jljS3r1mhr/HTwAR+2rCxswCKiQvOLKo73YVwn4NTqGSb8e3WypysOeKQEoNm0iW0jxnyk2V3yMfF2n8hw==', CAST(N'2025-03-25T13:55:38.9179580' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'22d86258-a7a5-4a05-95ed-624d912668b6', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'Bri5SYYhqD5x7ZriDWqaNlNph6OukVB7/zlJvWVwmbthZOpMjRvsW9vKYBwSBHuD6OtZBGcItoEURHG0z6AkLw==', CAST(N'2025-02-27T15:29:52.7301242' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'3fd03726-c137-4280-bdbd-624e154a19fe', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'psW+qOIeFFbjB558Rqy4Ls67i5XYg/DDKal4h7RMgdqQB+c9bKBjvGvP6oiajUyL3++FtuimjfkbGlVTFtf1Qg==', CAST(N'2025-03-04T09:52:30.1130000' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'5eeec237-9bd8-4116-b4f9-626b6d4f9aaa', N'00f32ad4-aed9-496b-8e09-13c290124c28', N'DXXxez0f/Dd0Ekpy7D6GZP59xIr+yjh/vgxkgfctFtBC5Ok090a9z84JfXZ6apFTzHgD3zruKA7tCOm8sdPAZw==', CAST(N'2025-03-28T13:38:35.5643734' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'955f3f9a-67d0-4041-af7b-6279a4718f8b', N'd87b4b72-609b-4979-b758-7771481da883', N'R8wigAv+mv+BaGd1h4R/OJdkhqvbagdFaic3rfAywOwPQ8knU0MLZOW5fHmOn/24VQwRzFMW3JbnOjTH5srMDA==', CAST(N'2025-02-24T22:33:22.1179927' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'b27c22bc-7114-40be-80f0-63bf7bbc362a', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'4rpWXusP9SfWh1y3vZgDyVVLQq0WXnvi8ogOOvLjJUX+pe/qr0XCZ6EvUPVmMVyZScrYKjOYpcm9TrEVffDdjw==', CAST(N'2025-03-18T23:04:59.3169370' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'5b044ac2-f1a0-49b4-bb7a-64f120e77cd9', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'AZvRS1ZEa47MpJJHKIN6b19/Jx2e7FfXpLqtr5yjaplgDuqznPHyawBW0tPRAWk69s3jOPGj4n4vgMdfd6r72A==', CAST(N'2025-02-25T17:31:54.2086014' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'10361087-be84-47f5-b133-653158f4e768', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'Q/ddeZb5rXUdSqaKwhD1xhsu4fafQL61KwGwhEz8byvBk3E3Xwgdnx+BxLnrceuJ4cySnvQXPAsGM9LEt7CzZg==', CAST(N'2025-03-27T16:39:15.8751683' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'87af0a07-93e7-4ddf-9a65-6581774936b0', N'd87b4b72-609b-4979-b758-7771481da883', N'Lqsmk8ve6y+UIlOEbWtKaUFYoDbGHJy/4kOM/4Ej+8TILIAqLlT+9MNpiFAFqSZKe4EetiZmz1g0JvjmciYlTQ==', CAST(N'2025-03-01T17:35:05.9242131' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'5c81c5f8-1023-4b4c-8578-659b4112e03b', N'd87b4b72-609b-4979-b758-7771481da883', N'N9gAdbPkf1wfr8ovdUzL9qFDSHALceE1fL337GHNRN2e/1fXSU5wUqekeWINPoi1b9uYIP1CkGiEl+ufJK4f5w==', CAST(N'2025-02-25T16:41:30.7159014' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'9f3cae22-2dc4-4b71-ad8f-66a6cb10f71b', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'lSU0v5dcOltaVUjrHojN7qhuzKHhGQwOSzMonqMyKhGlZHFGe2YYtFNLMdeRzKKmKwbVgk5D8wLcoB2WqDv4JA==', CAST(N'2025-02-22T23:55:51.6285985' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'92ddcb0e-eecb-4c00-9f4f-67c4d45d19a2', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'3n+FwzztOK6wYjCQIAoybUGYDO4UwoEoNQPk2IqqGpKM0OAYFS1H9HFIL7TI16A5T+DYtqr9XkuWtDbRcwocqA==', CAST(N'2025-02-26T10:28:30.7151208' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'fff40ba0-3bbb-41f5-9dd2-69048e9f6f1f', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'GajA3mzQqqf4eakWnfDx+f7bRcJ+Zxb1YJXNMe9Z0DOALmDFbmqC2VSSYTE7sD8A79x6SB2vzTjDbn0u4Fx9Ew==', CAST(N'2025-03-18T22:12:11.4014386' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'9f779b61-9fb0-4bc1-aee6-69d2bd9d66c5', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'pd+JTKTbJwne+mtMxpg2S5rMpJE3XDYdvtLk3dYHpIss055RxPlSMmnzRAl28rfQ8ADYsZRUSn42WF+XtoYVLw==', CAST(N'2025-02-28T16:51:28.2448482' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'2db575e3-778d-4810-8e73-6a2d1c6f3c96', N'd87b4b72-609b-4979-b758-7771481da883', N'lQIfknrXN7RQDHZs7wl1IVWA5gaBmoZwxikGtjTns16qW17z8qGHc7go7wgMyknHPfRN6mf67QI6BngRClbS1w==', CAST(N'2025-03-26T09:53:59.3958486' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'c185ee9f-4990-4b5d-959e-6c90e89d9f86', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'waAuULg6mTesqovVU2vAxionvl/WzWM9RmpOZcVIwEGh6tpzoNo3ktuuM4rxCDMoUKNQxhRGQVApjJIkJuUHpA==', CAST(N'2025-03-27T20:50:01.2290490' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'd411c37c-daf8-4060-ab42-6cf531d2b24c', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'kQ0TWkmiIpAMnegypzPfFjkDK4cb0vm2gN4m4q5eWAeTZEhEXLjs/aZidQBNJu7Qly2XZ/MbXzg0mZ27uMTImw==', CAST(N'2025-02-26T08:43:44.7899264' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'909f9689-6978-4bee-b27b-6d29c0727bd5', N'd87b4b72-609b-4979-b758-7771481da883', N'ww8CwZI946LOXqcYj1bA0fT7h+/cf9wE5HONcVWcMTqItDKmwpTgKtTRoqmLitBhNbn0TZEqNkodzgrvMEFiaA==', CAST(N'2025-03-06T19:29:16.5322842' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'e34b7fc7-9517-487a-aced-6d90e2a68e53', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'enVF1Y2hh2ejz7yLK3vR+GNyCfTte+YMyAujR+isAAfcuJbBYb9QABTTJ8/CBPCbY2urcjmakINHMCnBkTcoRw==', CAST(N'2025-02-28T20:42:06.0697680' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'e503f550-d907-4522-b54b-6dcfe8460079', N'd87b4b72-609b-4979-b758-7771481da883', N'ocTBUfmLsVNMJLmpKSgXwmHFwlwTF6oPIonAlfxZuuK/f/XrbUXWR6epNSXIkDcZPDs6wFKI5VCtrSwJ140fUA==', CAST(N'2025-03-16T22:32:47.6002856' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'71317ee1-17ad-432f-8946-6e70902a5b61', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'VNQnL7RmZ3k0GcmU54LlQSHCif9XGizkfVDayEMFfic+NfSINmzxJkMMzzjmU3TgEKbyuHNKn720UwR+CNMEPQ==', CAST(N'2025-02-21T17:21:55.3599823' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'6b469db8-799d-4478-a84c-6ec538fb71b7', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'XpmaFo/edChCufPrfPQCZ0sd2ka1mUgGIXXmN1ziWqxU4g9nFA06HiNnhFbGBssFX5V3isOuoh3/SWkSfRQG0g==', CAST(N'2025-02-25T15:47:20.6888147' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'6d2636b2-3767-43f3-8a69-6eea233307d0', N'd48d2dcd-7083-4395-8486-4375f6ad0de2', N'mhQEH+BRRKsZUObj3q3xqqwr1w8qSiF7RNfbMFncNuEFPbhwS0LA0sPgjtkLbsaZ8UeKQ1UoAWMgBT+BVTajyw==', CAST(N'2025-03-26T18:13:58.0746215' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'6135fd9e-8579-406b-abf9-70ed0f1bc3e3', N'd87b4b72-609b-4979-b758-7771481da883', N'3mCd01E1l9njf7qb1jgx+QovXRrCQc+LVzMQ1WibApmggjHlWnpm3T6RXD8sUtFbc9NbKTRibsZNzBbFqnl+YQ==', CAST(N'2025-03-26T17:25:55.1046277' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'03281ea6-062e-43f7-8ec9-71ef57ed154c', N'd87b4b72-609b-4979-b758-7771481da883', N'Xclt1j++m/ZVeWeB7s1+76LUKPz1JV6F/g4PfJQaRkCnv1ZYLB4/LV3CNrQV1T7OuOFpnmeHuhJYj542+t023A==', CAST(N'2025-03-02T10:35:39.1742246' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'44431dab-f72b-431b-bdb7-723fb1499cd4', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'+DlBwxLdqwfBZ8S4nare/M+FXfe1bnQTRHAu55JgAc6HgLV5YKaahjTkeav6G/Mkp0sQSNvtRHdm6j5eMCy1CA==', CAST(N'2025-03-26T17:03:07.3337368' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'd65e0e5d-433c-4db1-9787-73c5a91f23ba', N'd87b4b72-609b-4979-b758-7771481da883', N'VyCoYKwdt0ZHqQSGL9yrgfju1sa54jEsV9FvNfkSwcqThuP3a6EEQkNBBZ532HSOptptixUXkAmV6PzAyOFiZg==', CAST(N'2025-02-27T20:17:41.8491166' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'a195df76-64d2-4cbc-8ec1-73f3d919b037', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'5r48qOzOSviY4W4v3tBnWkKsXTT5dGczRV/pKVfuevAvjZ+avJS9OKY2GIQcx1MpHQIZHuUGutAhNNVSnHNe7g==', CAST(N'2025-03-07T21:09:36.4991583' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'dd58af26-c0e1-4bcb-aae7-742412565b27', N'd87b4b72-609b-4979-b758-7771481da883', N'BfCB/lo95vpEfS4pZ+oYwqB3rrJZIeT4GGRNSiQ8Zk7qadjy3WVxULeU1ozWDDOWJ9L652Sq80OhPT+LDV0UYA==', CAST(N'2025-03-27T11:00:35.0010593' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'b2a3748a-c6b7-480e-aa47-7552c9e9bf55', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'XSetSy9FDjxBgrysuU4MQJI4CGXSJHXf5FsbwrEwGm/7iaHEdt7m5H6meEPR2Vv1dMdu5mx9GYMNKmIWlfXqpA==', CAST(N'2025-03-28T13:10:16.9215399' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'72e8f1be-d73c-4a10-8973-7553b7edd197', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'lahHGqooWz+N6/Q4vj1jJTSWctjNUcTdrT7eFQ3jpFlw++5Pad+twESjlzJW+NvuBdJcbduTeuXl9JyK5AMiZA==', CAST(N'2025-02-22T14:21:46.8617443' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'a2ff3a46-9089-4dca-b49b-759609874d3a', N'd87b4b72-609b-4979-b758-7771481da883', N'9Pn0Sh/KKFVJ52iiAetYg6DprMF8pPQZuKGEbGKS2F1g0AGbHgosH3ersFkuGq9HDj5uO4wdT22k+iinViKwnQ==', CAST(N'2025-03-28T17:55:01.4814079' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'e9457f84-27af-43f2-8dc4-76dbb1d120d5', N'd87b4b72-609b-4979-b758-7771481da883', N'/1Hc+3KZX05B4HyJ7GA0i0PpdFJQRpzA4+mFE07snQxAKsGqxht9Qlxvf/hWorbzv1xC5m1SbYY57jTYLYhIMg==', CAST(N'2025-03-03T22:39:27.2129031' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'e4659f8b-5190-4e7d-ba46-77df7971914c', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'Fsb9LGgN4dEwtCqWcjYhmd5We8FzjdhmcjLGIFJMlG10UnSkxZwri8gN7bawi2Mtdl215OUWqo3q1rSckea1rQ==', CAST(N'2025-03-26T18:17:32.0075461' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'189084df-867d-4ae4-9e63-78bc60d0376c', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'CurEfJkEJlMUwaLmLfdsWvkleqf0HAKBPLvQxE/e0zgou7tlbjwFrwjFFxV11z7caeQRjI3vodhadgnK9EdHRw==', CAST(N'2025-03-19T17:43:25.2020068' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'c97c6b83-2fc8-43a7-bb47-79a05a154466', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'VgYHdCEl6juPm68sW8M/66FeVhNBMqK9Cuem5c2TpwIqmKnwgsSI5/n3LwmkPWObfNF4W16dRKvmQNZ2ykqafg==', CAST(N'2025-03-02T13:43:19.7883599' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'5b3f62ab-961c-406e-8e46-7a43a65a8001', N'a0f49e77-2239-4dd7-80d9-156d6769b0f7', N'eysohGhkvNPXrM0zDNHzwC3fCAQgeURPj5C0SN8XeDYbuWa4VSFi4d1DGHeo89/D9UnEwFWPUTWDxs4qkCRsGA==', CAST(N'2025-03-05T14:24:02.4225084' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'0a19d5a0-cd81-4839-bd45-7baede7513d1', N'd87b4b72-609b-4979-b758-7771481da883', N'JNnDdzZ6qIbJRAp/zkt/kO6E7SRelDs+MbfJ164ZtUIZlBSUaNiGtk4Y4hRKm6DAPNMI8nGiYokVsMc+CDV0Zg==', CAST(N'2025-03-08T22:25:08.7769101' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'919cf926-428d-4db1-a4b7-7db007d0f63d', N'd87b4b72-609b-4979-b758-7771481da883', N'uxJWhAZV4uWcwN6Ay8M7R2ODDcQuSdKP396KO0CpYXEK2vqgGXMs5wnGZamou5MQI125ERynBltqKZP+25hPRw==', CAST(N'2025-03-03T23:41:40.0775430' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'a334e791-e2ad-408a-9e26-7f5d5ff971d7', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'ugzqzEu+FXBTobHKL0cs9zUtDbCNvx86RaRPDvoWp88KnE4eWvfoi+9tB2SWTSMrFnj0N4tbASVozZop2hzN6w==', CAST(N'2025-03-28T14:17:00.2482062' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'7a999a32-e7e8-428e-9631-7f676c29fb5f', N'd87b4b72-609b-4979-b758-7771481da883', N'j1itzw/rD5aQpPBZtcf48Jsdddmu9rB/YP41A9a4QkAcvwu6I0V2jPq1DGrP5uWNnh6C4RtLSKViq24XlzyLTA==', CAST(N'2025-03-13T00:21:31.7665520' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'91113fb8-d5a7-4003-83dd-7f939ed81679', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N't1NljEA+fSiOXBHlHNng5NhkEohzXtX5wAaYechmx0xN+qOvWJlGvTDdwqIsEYKFKP+6kiwW4IZCLV15P1BUQA==', CAST(N'2025-03-13T14:11:21.4578217' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'2312b3dc-800d-4031-ab85-80e244cbdd84', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'/bepef1ItVPhNpKIbmKzAwaIKBmS1Zm96+6oRm4OXskml1lhuR5zUM+68ATyX3FfSr5W6eHSwXpHkmTAEzhSpg==', CAST(N'2025-03-27T20:47:32.7659853' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'b6c8342c-f17c-4abf-af58-813f450e9461', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'R4XHDUXG7WbLsduFCL76w4dt1qlm4SSUoT7Tt1IJXG3vdeJVGBeH73sMY+tj+0cuYbwuoMdR54VQW9M/UHGXNw==', CAST(N'2025-03-02T16:30:23.6595659' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'9d96693a-14e8-4f45-b220-81ea48f7a5ac', N'84c1a775-7f5d-4bd1-b8d5-e42dc1172f76', N'1Gm8Yaws2zKsOsHuZfJWFfeNgSHVrY9tR0CMZgkjLhMtfUTyqBDS1/QurJD40FwPfBBpuklCqJsIWRamAMFXAA==', CAST(N'2025-02-24T23:22:14.4763795' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'12d56ece-f6dd-4fde-a412-83a52985c347', N'd87b4b72-609b-4979-b758-7771481da883', N'DDJv+1e6fTTLObaBaBTBJBEjvkOwBODzz3zTp1Ld/emfzkZ74oKl0HMEFv70zeA3xJVsAQ0rgqAOk5vtf76+Dg==', CAST(N'2025-02-23T13:16:02.5117117' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'7b28e5db-de8c-4927-b6c2-8444ed48391f', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'UPCBNUI8/lJHjWEjXCiPAQTVYODmsIzRJ7xxPcS8rjNCsAX6nDGao9yy7BXeUNllbk+il/q0BWl6hLI+IsE4qA==', CAST(N'2025-02-28T13:44:01.0995488' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'bb075b24-40dc-4871-855d-84d37780709c', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'BXFrD7QFBSv4cvdhY9LcXOY67BHJWAXubEo9u8Pd9vqY7Gu+pigBSAA49KQqXGKa44QCaIQoyLXjHP3XY48mSw==', CAST(N'2025-03-05T16:26:08.0395203' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'0d95b8b7-7f4b-4bf7-95be-858446de1a04', N'd48d2dcd-7083-4395-8486-4375f6ad0de2', N'/p9swkRoMwv/GYGOuUL3SME3Vkp63F7Tfu+BQNR5c5ms/AAhgMZ3g1Q4JGX07PNsnp/5C2kuk5Zpn4AYWWQvJg==', CAST(N'2025-03-25T13:46:21.0783385' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'8430aed5-0a18-4cc8-a3ed-86016b96410a', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'3hl0YdXiYe4RlaVBIKL8wtZSXsPT79nw/wYRh/KYQi5pyB3vhQa+cYI94PV8MXeHWhaXHR+MUQZm88zTQwn4AQ==', CAST(N'2025-03-28T13:35:00.3401504' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'd34c3da4-722b-4f2f-95d3-861829818e32', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'iPQMz8TqlyKjlo2KPP5B4VmrgQHqM13Bvn8YrzxaKxNmWi+x+7Iua58TvOkBPmVp0hTieJ6g1xlnqmZ8xRa7mA==', CAST(N'2025-02-26T15:57:21.5797246' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'2c219471-1f68-44c8-9e19-871d9d0a77f5', N'd87b4b72-609b-4979-b758-7771481da883', N'AsQ3vznZMYPTPCGU2nVUSH3ulafoLyq00tBCzMpjn2jw2eMI/HpyzgEp6BJjrh/mQjYjCqQem/f14DRIkvkkHg==', CAST(N'2025-03-27T10:48:52.2391297' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'a86e657b-7994-4278-b637-87bfdb73c79e', N'd87b4b72-609b-4979-b758-7771481da883', N'5vftuVnQYc7ZDNaHgdnx8k7jhIYYlJNWFBBazREdI4+nEVw2fldFYmmObFWjYgkilHw8wajIC2ghUXBK3m/N8A==', CAST(N'2025-03-27T20:50:48.0787279' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'a44f615c-4af8-4e2b-ad97-87d11315bffc', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'UdFPbU0CutnwHMXC5J/I3thmUKr3WKYXbGNZqKl+vKDgAXS+PRZDnlwu6FPuvU2hVWNlG4uUHvkLnrMFHP6y9A==', CAST(N'2025-03-26T18:30:17.1171572' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'bcda0f27-292f-43a8-a6cb-87f2688fe0bc', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'HnH8LDvUSMFlM/OzmZjPf/KX8G7J9UkDq5wu+UI3fEmBMk00ASeo/xWuBy/wRC7xutqBH1CtV0bY8cF4KKYv1w==', CAST(N'2025-03-30T13:11:45.8987568' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'65e56478-ac84-43eb-ac9b-893071723bf5', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'lBAOAvH9Zj1baFAcCVekSfS3Fo/Lr4ApR+5+IhlqVeH6Mxq4XvNWudmRh0SOShYeElRpL3qlgsIxMMphZVl0xQ==', CAST(N'2025-02-23T10:38:48.3427555' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'36499d59-7dcd-48ac-89ac-89893331530b', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'7jwtGuYUoIzBkGbVV/s1cqhJEs8CjEdC3UlwslqCRaAY2s2tT34VhFAKyeHoGl100G4M5bSYAmxDn5Zavr0Ycg==', CAST(N'2025-02-26T16:37:12.5643926' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'eb571c25-1d4f-41ab-ab42-8a8f9dc664b0', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'vymzC3hbOfKVklOPXCikoGz/35PLE+5qUAB2WwIFArUz9Hr5R3gv0UB2TTQje7/beLPVhROMEG459vhB+XHAAg==', CAST(N'2025-03-08T22:08:16.9824310' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'8ca2dd37-b542-4ee2-8aec-8a94912fef8e', N'd87b4b72-609b-4979-b758-7771481da883', N'6Vt5OZEEZy6it6HcFAR3qtRfT/JCU6U4d6hV2/n3LWVp4hMemzTkoR1muc/mpvwSCFiHQBf31qTntUJX5Jr7Mw==', CAST(N'2025-03-08T22:09:40.2192391' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'dba88963-8520-49f9-a1ec-8a94b4d4a984', N'a0f49e77-2239-4dd7-80d9-156d6769b0f7', N'psmtjg+nn4VjKgg3P8y1h7ZZUNTQJhaYcz53oAzvsvNLViQNfIL63jg9qKRFDlleWsxFGJQi7L9NBV+/HkVevA==', CAST(N'2025-03-01T22:12:13.3290312' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'a8461cdd-a2fc-4caa-98e0-8afad958769c', N'61d80aa8-bc73-4093-857c-dfddd1c78b88', N'ts7zoLR0yE7glLQde7duZ4QB1v12HzrDyUU3q15oD1kLr6mnitcyt7frAT2wSRasXK3Mbwh10BpDo25l7aO2mw==', CAST(N'2025-03-30T13:07:53.3962594' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'84b6bc09-bafa-4ead-98ca-8b45e73bb568', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'BrZ3JUtJ32Np7vO3Dt/9PQ1dvgri50ZiB2tuYnfHRmLAVw77OJyhFOkG2Pjtz2OxeHtctgIbWy+Onyjn0YsCyQ==', CAST(N'2025-03-26T14:22:27.7873339' AS DateTime2))
GO
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'3ee5f7f7-b692-419e-8b39-8b4e16defa62', N'd87b4b72-609b-4979-b758-7771481da883', N'+iti9O13K6iZEQTJTs861sHzNYgxXGjxvgPudPu0zPFLOa8po8is1XmqqQo2Yr6Da3xX9MPFNrNNx4zardYQFw==', CAST(N'2025-03-13T11:19:23.7099969' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'0a76eff3-d1a5-44cb-b289-8b8ea7dbf58b', N'd87b4b72-609b-4979-b758-7771481da883', N'ctkXBuskNkLzuQJUWkNczeRz58ayTd3hHuSHczkjPP996QECZf2eBH3urSzKUqIw323S9BzhfgLHEiXzn2bACg==', CAST(N'2025-03-06T17:24:23.1785760' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'5720dd6b-0fdb-4441-9aaa-8b910d440308', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'6XXCqLZnvMPKaIrawUsuXRlcmHgfnBz4tJAWkBNp5AD/0JpZYJ8suuIC6hzRnPZF+RTQTeknkiLlOxgbR1AxRg==', CAST(N'2025-02-21T15:56:19.4407313' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'44e5b43e-f0fe-4110-95de-8cab6a580e56', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'yS3QOdmu5gP0hR9nmUyFyzll7NrzTM3JUaVIT6Pwp+XT1hhFfBBeZq4ayNSankEBCOT/wcWn2pePXrk1albXKg==', CAST(N'2025-03-26T09:07:29.4460633' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'a5ca78bb-a36f-44ee-8c66-8d2764742fea', N'd87b4b72-609b-4979-b758-7771481da883', N'VjFHZ4ULsKuzgNFhctg0Y1aujn+IIS9O18FVJx3YV7z0pPHdA+lvVqulrtOJwPOD52Z0j2giY40zfFhFY5OvwA==', CAST(N'2025-03-02T00:05:18.1857188' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'8e7dada3-cef8-46dc-8f54-8d476cc6206a', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'SXP+mY1+pZfF1vZqVUU7LBzs3lYgG2lH8F6H6qBIn5aYUvcnvx6xXT8c6fEew/dMfMo9ZtV1grKgbnURoLT6kA==', CAST(N'2025-02-20T21:55:44.5174412' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'17e3349f-2d05-4033-a143-8e8b498d6e82', N'61d80aa8-bc73-4093-857c-dfddd1c78b88', N'yyFFsIyqozWijcFSF0R91w6OCqRwbGopXccYjHm+xjqSYBpvnKnt1S51f2xkroswmjmmgqO8vPlgC9eVCBNcNw==', CAST(N'2025-03-26T09:26:04.7812936' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'c7256d59-c06b-41f9-b2d0-8eaae9182a09', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'iUFaUztAyYE7ykrt2k23oR4vEk0G4VlmPSvuGQt/wg0tgvxNihwgwQuKmgTCMWqYZUK5ycfScHOdvRtoHCfRBw==', CAST(N'2025-03-25T15:46:17.4864834' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'2a33bb56-b375-4836-8c17-8ff0cfc96ccd', N'd87b4b72-609b-4979-b758-7771481da883', N'BiU8k7rcy/NBuSH0ie4DRf+vXdDhmwZB3JlcW4VLAhoK9s93lN50S+T33RM4QGYzpA6uOO33tDrPZ/C5OycjCA==', CAST(N'2025-03-08T22:19:56.7445598' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'4a5db72b-3a5b-4249-a988-9132c3e387d1', N'd87b4b72-609b-4979-b758-7771481da883', N'GGQjDYyIMjcEDj4sfrll0IyXVfEppnlI6/1ylupG9YTZE/ZZMT0/uUiwbw7D90CQgnLjMYh0nfTcguVeZfAWiA==', CAST(N'2025-03-25T23:41:06.7216450' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'43d503c8-5846-4e71-84bf-92542d836d35', N'023312e9-80c3-4262-80d4-18102e6bdc5b', N'gflptwUZLLf5YPbhFAdXth6tU0r4Ist/2B5erzHC/yGp0Wu/UZKK+dVpj5Dkqm8Lue3GPicGRRzV3aT7z5+fcg==', CAST(N'2025-03-28T09:37:39.1655904' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'e85f832a-666e-43b1-be84-9284167de317', N'023312e9-80c3-4262-80d4-18102e6bdc5b', N'LLV1tfFKRTWdmfyeHhvgkh0l391IsdXQ3WHY1x7Xhs8B9nk1iIopakcqANML/OKZtVuY8Dk28jh5F9a8qLbCow==', CAST(N'2025-03-28T17:51:06.2257333' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'd14d8fb4-ff1c-49b1-b0d5-9481d13b249d', N'd87b4b72-609b-4979-b758-7771481da883', N'cmapG+TxHXKvvKkvg4hApQPzauRAnlcObzGvN1Jc4kHztBUpZennEKC/nTS1bmrE4kEVDwfKgpKc95uQjWYOUA==', CAST(N'2025-03-08T22:37:28.7027264' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'b91e7a22-ca5c-4c20-b499-94d3cc1c06c2', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'FJ1hLX7VCW4Pv5OIeTCXa5Vqhbfa3l6LM63CQ5mFDq8AgcWQeoD/0KR9EeWYcLln+3bnLaAUGNDUenx+MPW7ow==', CAST(N'2025-03-27T16:38:39.8916560' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'b77a8da0-4acb-4035-9421-94ee3b3456d5', N'd87b4b72-609b-4979-b758-7771481da883', N'bFsJA9UJ1db7w6DN4FeQXlSSunr7nty8MnEC7dfG61BNu+ZfajVdbefqqkSGkaCc88cRq4Ac027dtZk2OxR/jA==', CAST(N'2025-03-28T14:12:12.1398934' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'dc04c2dd-d7b0-4be9-9f0d-952f23487e55', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'Kf6vkH3P66Lu1L77n0BaGd1Rn01tjqe+vk0uyXp27yaGR/9+N7Jd9ffxct4ntNuvhIZ/yMZBoN4PsLelHdt7qA==', CAST(N'2025-03-05T21:59:35.7365621' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'1bc205fe-c444-4f5f-8a8a-95f396aa23b9', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'Lt8PZNbqZ0b7ZaznVQQXNlX4Fs/pZAeGSf0Rv74m77kNH94VwtlaolElL+gMCHxZK/GjmyFxenSe/JZRbhuK5w==', CAST(N'2025-03-27T20:57:25.4018334' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'b7451a7c-e808-4e7a-b9b2-96d8a255c6aa', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'uTAqA7xno3eOv6/UV6GCruepxE7qlz7M0IpPCLdtmx0H06ZLG9sPXcSvVg4sgJZAcpXA34Evq7Bx2KWxSpYPIg==', CAST(N'2025-03-26T23:57:35.0675490' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'1081968b-f25a-4534-9d1a-97354aa917e8', N'd87b4b72-609b-4979-b758-7771481da883', N'ULQlnT/1z5Yoawx1opkrKv+crAq/UaTr0gwZ1tSkY++lCnfWAUOjK6b2zp9VqSmeW5uiJfSV8Xgl+yjBMTSx0w==', CAST(N'2025-03-13T14:00:40.8559453' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'e002a99e-b520-4c39-93b0-976334116bf3', N'd87b4b72-609b-4979-b758-7771481da883', N'BdhxMpAX7tEOG+vtIXN+SxF5y2qbTjqc7gnjFQfqxeRMoDJQmL9mE2re6rgmIddRsa8AESUm2BZBq70pp+R8dg==', CAST(N'2025-02-25T16:44:58.0528525' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'83ff54bc-a934-4051-a451-9834c4935835', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'4lifndfWRvAo2p1/CMF3Uh1ieovnaOMYylRsB6lksZ7YnhQ/y1maokfOKfLsTCzm2tyOBQsf23tN3ykXmD53zg==', CAST(N'2025-02-28T21:47:09.0643418' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'b5b3847c-0e29-48c4-9f52-99a61c669493', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'7CIG5CaQh3y5X+UMv2PU1hEHXuLwjcJrWHzPjUIHspZHJLqgwbJEuK5jx4mJOhlGcS0awvVXXecqHmkw2X+RwQ==', CAST(N'2025-02-21T10:36:00.9665933' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'c6d405bf-d9ab-49bb-be81-99cb18fadbec', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'a+8QD0+WYUKhaNtNm+gIi8SYvIonn9paGVU2RD0UwJrVbrTmEq/16Ad+nh28H4qusFqXLjHQU/VkroG9Gp7qmA==', CAST(N'2025-02-26T15:55:22.3082163' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'f889475c-e8aa-459c-99f6-99f0983a58f4', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'xUF+Fg42xeQUX5G/qEhplMszpfFPvtvU62d5c/eWElq94ywpwpfcb+qUVoQW8OQbmZVJ7BZwxeQ0mLGxlOwJsw==', CAST(N'2025-03-09T21:05:54.8188998' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'ed7835e7-81c9-44ce-b880-9a435de60b5f', N'd87b4b72-609b-4979-b758-7771481da883', N'sRZY0jAlH2JqQzA2sMkDt2UT9vxqF/gYA0t4j5wCHDwzIQWkxGa5Hf3ziHtANXmS5PnnTTfjZ4HDU0x0ZeaPUQ==', CAST(N'2025-03-06T11:48:56.7266007' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'4f8c5262-7df9-4582-9bc6-9b84cdded2ca', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'FuhW0HXB0APeHG5CqNgayUOnxfEnV2CiJV6mFfNIYGkssuJm/q7eVWgVFIc/QWbz+/VeiMvDK+ApXezqwP90dA==', CAST(N'2025-02-23T22:49:57.6611995' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'3ede4fc8-cc3e-4caa-896f-9c0457c18a9b', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'TFkly6mHt0apkne26T293Tg6+NWKtdtm2firyuGc9Vjs7OePRVn0vRS6aZcmcCU+fXIGsqp1idKUKf8d5N5J5Q==', CAST(N'2025-02-25T14:55:50.0041932' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'0cc889b1-4193-43c5-bad1-9e3ac05d8f3a', N'd87b4b72-609b-4979-b758-7771481da883', N'aYNkb71E1GiwgmePprVObDXQbH4qZ+kMhCxPSIYpJgqkr1ZlqVnaoUAN9Lp7IqqW8njJWmx1mNr/VIzo3CisEA==', CAST(N'2025-03-04T15:04:13.4907716' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'10e14573-86e5-4825-8a5a-9e6fae34dc7b', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'VQjacUYmG/08dDoHL1EY2GkgDi2GUlIJcxKiwaCkiY4mVwFcftCAZlPZrw2DMfS6XfoEZUO/dPrSRmOqxGqshQ==', CAST(N'2025-02-25T11:55:32.8650320' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'd050c24b-3e42-424e-9e05-9e957ccfd138', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'h2zBnIk7gKu0PkRo0ImFXJtfoi8WUZzGdqLNLLO7yg0GoOlAUlVX2C1pSqMoidf8JvCchzNq5mlLpoGUcIxWfQ==', CAST(N'2025-03-26T17:32:24.1854654' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'82d5d518-24b7-49f4-834f-9f424f0e17be', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'80kuXc/8bS/g5KAIVODTiZA5uFjy+jRgONeYT7dp19azwL1elJMww/T10ZhfzGhFg8bZqoRHN763Gx8I5puPPw==', CAST(N'2025-02-21T10:55:07.6082642' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'6ebfccf1-1b96-4673-a3a5-9fc3fe21042d', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'/WRF5QF6C4M8c7WbpC0iDRFoD8IwyecdYq8xo1Lr4BTLOmtxm5rHxBgXFxApFofAT/RmKZuLn4wAE+66j1RRIQ==', CAST(N'2025-03-12T23:15:18.9957763' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'99d34018-959c-46dc-b0f1-a4adb404c32e', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'vlQ/kcdFWZ1yHfXuGiQ/9HAPbnU209fUyMejtct7f4y3hYj1EWJPtyk1Zg34z6B619/tuqgcbj+FmVcUxa9+CQ==', CAST(N'2025-02-20T22:04:22.5709196' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'c34b9090-f6fb-468a-a28a-a4c2df4f1bcf', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'Q4p9RhKgsrQzMzGqTED/oIe4plZkv4thNxEB5vZAJZT1bg1hU4UDb16j2cp1a4wmL+WdYC7uDkBthfbJjbALFw==', CAST(N'2025-03-04T08:40:28.4289361' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'161acf6a-3061-48c5-881e-a51b684bb9bf', N'd48d2dcd-7083-4395-8486-4375f6ad0de2', N'SZhXFGx3DnwPifHNGOs6IViv6Y0e7VWNTaDIybZcdxvAQUEjE724MiQhFs3fsZHQ84afvyNgzyyIB4s9NXIZiw==', CAST(N'2025-03-25T13:46:52.6121581' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'5386bfaa-05a8-46cc-ac8e-a6fc6fa4be4e', N'a0f49e77-2239-4dd7-80d9-156d6769b0f7', N'0INexJNv18f9MU0EDCxtF0FiJTrTbDLPuQtTZmhfslhduwAb589GXDaMY4qU9kQHTWQKUkqhdL5cPi9xi7sQBw==', CAST(N'2025-03-05T14:27:15.4361459' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'8bc23f13-0687-4db6-bf3d-a789a23d6701', N'd87b4b72-609b-4979-b758-7771481da883', N'i9r2ZXKUzaqIu7F4xFnTTPkfFgtNWkBfmYiLSIAOKFBjzO6/Q+5b14bKpswrPIlyEZL4fSFjFz+IfeqzM2V24Q==', CAST(N'2025-02-25T16:52:45.0165118' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'c10e072c-e263-440e-a781-a78bd4946122', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'8mWPiQa0tF2iJ3dTIXNAFDInAx6isjuKqoA7/YC5TbsTqqevP3SxmEYBVu3WOkx0lBggIO2mBLpQqTwmhblRkw==', CAST(N'2025-03-05T21:58:03.4454948' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'5c11529a-38a8-4346-b8de-a8441575626f', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'lD3rTFWFbp50fHCLCfSs69koJtR4guBVKj+525cCMUAmOFEfa5xDnRS75XPPSJKBW/eIoLRdgeJP55QD5c8aOg==', CAST(N'2025-03-13T14:00:20.4281668' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'd24f329c-dd18-44e0-92c0-a894a1d04969', N'd87b4b72-609b-4979-b758-7771481da883', N'N3jbFJ5EtAeKFBBdp6UV06fZYHsWmntYCuCjRSurhn0wqX11Z5W7FQ2qxdukILE1xGBPnqtKa85pAoWXxn1nvQ==', CAST(N'2025-03-15T16:02:20.6686090' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'111a2f20-115c-4692-846f-a9f6a085d261', N'd87b4b72-609b-4979-b758-7771481da883', N'+7PfdlnXcKOjDAAhjocuGGISrpogQW9eIpBhrMIWYK9CzQdf7nNI/32LDjSf0AJDN8YveOO6MCLY8Brxx2NaKA==', CAST(N'2025-03-26T09:14:46.3447934' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'523f0ac6-1df9-4f52-a6c0-aac990b15544', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'Z1MV+OKItAK5G6G2vobXuKbseKUl6vfdExmhNeoRnYZPxc74c0Ne//Wjt06wbsaZ4NdN0u7vTUBjqFenidWHVw==', CAST(N'2025-03-28T08:57:01.1352321' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'492abd47-1e9f-49e0-bf49-ab470ccea06b', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'cexyJl2PgfxcS1owaaii2lZ4JiKJnENj7P7es4TAMPFasEPDyMiFZudRwrJnuZJ1NehfCX9W9lOFS4cnDtYOxA==', CAST(N'2025-03-19T17:41:16.4102082' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'adadb5ce-afbe-4cde-9b0b-abe1f99371ca', N'd87b4b72-609b-4979-b758-7771481da883', N'Ss1Bkz0w1zosqIViPL5J/c1F7N/Gai4Rp16DKfWarX3XfUDc6xJb7l4DIAhfY0Jk0zQzUPUxyhyDnLm4Gek9Aw==', CAST(N'2025-02-27T21:48:13.4747880' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'5041d6f0-1ea6-40f2-ab74-ac06d67186e3', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'MnzcVa9P5Hr4AQRaAmO9+M+T6ZTMeGzTjMJybS9nVOZY2R/ixQbk2gSGgLNSYyuBVIBHrD4WKyj0gyK9XTowNg==', CAST(N'2025-03-25T13:22:49.3321577' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'368808c3-1bde-4c92-a6ea-ad0877e5c006', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'TxAhgqS2OFPst+WiMiar0+xUP1vZDroRTJz/+HGb9hIprYGtQVu1Sz6wAYm+pxknqGxpKo/Bybks72cwqgIsTw==', CAST(N'2025-03-28T17:46:31.2721312' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'0f71c653-cc44-4092-8b61-ae950c33fc64', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'WaYFg0aJhcdOObYuUY5YHWwS6NlkDRX6Jiucwox3gdysA/IQFAv4L7SPUjGTLjYf/wr1jzGvOEOGqtrdizflkw==', CAST(N'2025-02-21T10:35:07.6689520' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'c5e82db6-2e7b-4e65-b0f9-aec5149432ee', N'd87b4b72-609b-4979-b758-7771481da883', N'C9/rSVRG0J0EzstcHNpmYvYgJ16Gy9SPnUPBZ9ktLh/qqcDJj3B6kCZ0Zw8n/JBMu3dOXW4bGspXLcUazdq/1A==', CAST(N'2025-03-26T14:15:25.9833621' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'0c41d744-55a0-46ed-b509-af30b6fa2938', N'd87b4b72-609b-4979-b758-7771481da883', N'lDMK3tKoBSIEYvoaIegXITFVcF52c57rWZXku/NNGMlWZEIjgKo+XxRhVfRhE8/xryJd+J/dkhEPpLY12VxERw==', CAST(N'2025-03-25T13:18:46.3835692' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'c4df9f23-a07e-4eb3-83b9-afba4b4ffb6e', N'd87b4b72-609b-4979-b758-7771481da883', N'CZFJWhIqc/pDonnU8rdDIAE/OuuIfWL57Pa8oke/PrQ+EMMrf9nrWvgmZwJxxRHzGYYDfRMu3Z0OZ6cSP4ZJcw==', CAST(N'2025-03-01T16:32:05.0198307' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'8dd52b79-d16c-4f4d-9430-aff34ba3c188', N'd87b4b72-609b-4979-b758-7771481da883', N'IyvxkNy9kn/flNB2YkfHLVwmlWtsVO4lyNB0rW0VA+2NJ92pmzlzo3fRBTr5ylNCMC4C2xvGZi0dX9C3e6ytEQ==', CAST(N'2025-02-28T10:01:57.4306736' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'bf8625ad-2b5a-4a0b-83c3-b0475784dc3d', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'+2oH9pk19rBl3JO8hsoQdjICgKDDRdfVKVCzcWFzBBhNnMG9dPbdYpLvCHQJ/i1ig/vVoLZTVgHXuj9ypboVzw==', CAST(N'2025-03-29T13:47:22.0027495' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'fb5b8c99-b206-4c23-aec9-b0d0f341b875', N'023312e9-80c3-4262-80d4-18102e6bdc5b', N'70xf8ZCLqdVOZXgYAl9e1YC7RqVJpYTLSUEIkTETaMPlwr03e72tKb4gh9NQa7X8ONfD0ZesCQaDgKOwvq/rag==', CAST(N'2025-03-28T09:03:59.2811465' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'ff71b41b-7ca9-4538-bb34-b22765e9acea', N'd87b4b72-609b-4979-b758-7771481da883', N'Xaftt878DhfyHAo5WqhHx/AUDF7n6VfCtp94cYjLozoigDL9q/fzF5togD2Dy0gZ1Xt0tUwBDRnB5frgVeY9Zw==', CAST(N'2025-03-26T15:58:47.3262359' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'ba1ec00c-c530-496c-83a9-b22b8a612a15', N'd87b4b72-609b-4979-b758-7771481da883', N'6N6k63c6NN25lDIonxGzVZ0zxTADRLPwbbkbc0kJLKZ9jivINr/x8n+NMVMZ5n1t/ACk79jK3P0Dx9wwbsWjEQ==', CAST(N'2025-02-23T08:45:56.5411094' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'617a02ab-70bf-4516-9a20-b295619240f0', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'gCsrPOWl6q80ZqEFRSvnqswGlrC6m842yY/M4IU3M1bcxFpdwklitMq2gbCupjVMu9G8oGpmzr0BADnFGo5Glw==', CAST(N'2025-02-23T23:13:05.8789813' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'd4c700d7-dd0d-4f1f-a939-b2c207b5bc34', N'd87b4b72-609b-4979-b758-7771481da883', N'VSS+5DSekLza0pu+chIsmndUJX+ZmOPk9VaEzkhqQ9XXyYuBppuzNcl6h5aYvArhOxiL7sv5s/ObZxMcemQfdw==', CAST(N'2025-03-20T01:46:15.2021598' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'9589b918-9f66-4dda-868c-b42205e29754', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'6ZghtX3XwJmjXlRUQwXccNSSBIABAcPupt/SbRMmJSGqZaX2hm1ykVq7w6VZcOJh8BMBjBnr3lLXKOdKYpSg4Q==', CAST(N'2025-02-20T22:01:29.5470605' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'f36feb12-5eee-42a5-8fe5-b47f6093cb2b', N'd87b4b72-609b-4979-b758-7771481da883', N'rZ+PbPoUsN9NpwEqfLHD6C223hHGIZNg4Do0PWVlmB6cgUuEGkgD6LSzrBx9KfgDlSBiC4hVzA1Fy99QubUg0w==', CAST(N'2025-03-02T10:11:09.0655112' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'0e787191-6971-4311-880d-b4eaf86d554b', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'Yd4wE1dNCOs7waE4EVk3vebuY6/JVT17oRX0t6orlaurY1CW5Vxs+JSO2v1+5/zeqykuyzEENNza3p6RReXp/Q==', CAST(N'2025-03-26T18:09:35.4132597' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'f56d47dd-7cc5-47fb-b25f-b558cfaf31d7', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'1TM/ay/3PxQCYzCawm8CIz8EdwvJQOtmGqMRA3/uZD+2gRXnea4t2qxbfjLiUhYwQfgBXpP5URf7hntR901wLA==', CAST(N'2025-02-20T22:04:11.7221765' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'8ed26617-6514-4e91-94be-b85193f37941', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'rvlRPivY+hvUqiIqh3T/7lRdF7inhmLIMwMylVi3l4fEfRM65AzZ/Z8SOY2hkMpdq1hdg0L/6iiCb2w4ZXW8YQ==', CAST(N'2025-02-25T13:04:26.6773728' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'a6c4e635-89a9-4245-be10-b8cd98917472', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'SR/R8u8nkBURx9ucpcUSPfLCe+VLaKPlB7InbzjeR2Wc/AsjIgqwcbXNMNDiJfyJHgFolN3vgqMvi43ttv4dag==', CAST(N'2025-03-15T16:01:26.5046927' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'cc42467c-a027-4907-a4cb-b917fce65686', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'UASJ1uMeZSQLvaN8HZDsJ1fg0Sdg+ejTyadNuYcxen/VN04Kt7pOJZlRjh1eykgS6CYXPwjhCmNZ4MqoI5NnmQ==', CAST(N'2025-02-25T16:50:08.6070719' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'8b0a83be-275c-4b5b-bdc4-bb4fb600dc67', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'UM3fot/3q5gPMBhnZ25Cu1b/Zq8eNWRRUBoSM+I6jaXoVrSCKxUBNqhbFx+Ij1fvPr04rPMBAoFcpFytw33ThA==', CAST(N'2025-03-03T23:05:34.9216657' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'66bcce37-d997-410b-8a2c-bb964c11e72e', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'Uw2EhWlMZl39sS7po+13pd1K3eZdfFPYGY3aLxm4+OtFSmVSNi5nayWHBcIZ0ljqoXxqeWpJvS2QQfut1CMRTA==', CAST(N'2025-02-23T10:39:07.9195735' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'9b48f33c-70e8-4c82-af37-bbe20f741781', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'zBSUxuDG4FsjWpvCMR0T7ju/f00azwRKfjxwiuxDMgF/wCsSydyVQT1Usvkr3nQx480P9YJqrexYjbLyFr2LIw==', CAST(N'2025-03-27T20:51:11.4257831' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'6cbf8262-4248-4c86-aa01-bbf4e8ad191b', N'84c1a775-7f5d-4bd1-b8d5-e42dc1172f76', N'YK/0xaznRNzwFob7gbV5dRHcgAHHIImF0fgEjm0KgUciyD7PRx0e8O9vV48JFC69vGKhgLPsQTcJ9qSANQQPvw==', CAST(N'2025-02-20T19:17:51.9523971' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'92fc6656-9fe5-4051-81cb-bda8b2190c49', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'dev+IJ2TO71SCF89q1b6KbKOeeYEiPMZIO7RCyO2hZuxsTryYMGHbhkRF8lzSeKiQShBv16jBGsxYuEddIY4GA==', CAST(N'2025-02-27T10:03:44.1845480' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'4fbf91a4-3aab-473b-92c2-bdfca04e92e2', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'X90K0ofj6x+I0AMwfEBDBUtfLqblCiQ/Okj8HOrmRCCLzcnNwOU1+1H3KtSNPlPHooGCdBpoVfAgQJ+ZEZ5RFQ==', CAST(N'2025-02-20T22:04:34.2634283' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'900d5d03-4669-45e2-aa95-bea3c5749e13', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'jUXlvym3iZvbk9RsieRZdXyU236LKdDW4Au+1dNxUI/goQAlbblKANb4f673Vf5Yh4uDB84kRHH0Dbe5pqLwOg==', CAST(N'2025-02-22T23:05:59.3173434' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'65f2f868-e71f-44e8-884e-bfc3131a80e9', N'61d80aa8-bc73-4093-857c-dfddd1c78b88', N'xu0hRHcW9l0E/Shd2gAiLpGuCg4Bbg/2gO9nLH/oU/iqXkCvA1wp2lWme7vzNnIJdLMa7C5Cw+ZrMfcb9XuU0w==', CAST(N'2025-03-30T13:05:25.5374233' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'f3c867f7-b79f-47bc-858a-c1ec93cb57a2', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'or5TIrtdq7bapEBfqk8NH6NO0zLu/1Mz7lV2KzHzmjaEkPcl8OxFczkB5ZyCkB5rgpGlKv3kNrGgE83sH4lUPA==', CAST(N'2025-03-05T22:03:06.9243664' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'afe11fc0-f9d6-49e9-8eea-c21dcec8c974', N'd87b4b72-609b-4979-b758-7771481da883', N'UIn26hRJKZsZu+4rd70FjGkETT5abuKtzxvWmTiw8KVKgEEsowEMsxm+pge78APegzIZB6CGfx6ivnOyUw564g==', CAST(N'2025-03-29T14:10:00.1859159' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'2244e36f-71ec-4eaa-8656-c22d2f115c92', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N't1J5jqw1asmS1t0gvqu9A5TIYcRxFLnBQfZ7QFrnRe11cD9PpuMX03MXD3I1kNY1FdKYS6kSCa8R39p9yREJyQ==', CAST(N'2025-03-07T15:53:53.2524729' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'11175a6b-a44a-4673-8d3d-c2bc73ba6c91', N'd87b4b72-609b-4979-b758-7771481da883', N'jUpzjmrYzLz27fG7BVD/Kz8oYXEv2nDG7C3QE74kinZVSM1vW72mRibDHlp2p+jDLtFmgzyUuhM7A3es+0GasQ==', CAST(N'2025-03-19T17:48:28.4542420' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'236bf3a9-3bb1-4461-ad09-c2c78061c7b0', N'd87b4b72-609b-4979-b758-7771481da883', N'O4bwTz7ZXOziwnOkddv7sPuLTkv0N1PrcDsvnDtShRr5M23dCfv3iX6cs3EZ2bh6e/26Jn+AmFzKRVbqTzCiEw==', CAST(N'2025-02-27T14:09:10.5160857' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'3e9e1c67-cf8d-44ba-a782-c2f5af166fc3', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'AZuIHPRpOj/vqCDsxKNT5VE38m6L+vwXbq1Ap40mMcpiwYXC+62Je14nrKtwdS+7VBk5SLzb2SsVan+KDOHxcg==', CAST(N'2025-03-13T11:40:20.5355760' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'7a8b4b1e-db1b-4b67-ab15-c3ff0e72eb67', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'mJUGBpx4g2Q8udMwmaputb6TJaTXrkk4HnXcqWsTQqvQTXjId2HChfUj3M9Swn4G4aohaRKoPLCLO9Sbaxl1DQ==', CAST(N'2025-03-16T18:31:37.6943511' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'177d0860-4ba0-49dd-ac21-c531c2517a93', N'd87b4b72-609b-4979-b758-7771481da883', N'ufoRO9IQpZori5yjhdFIjsdTf3io/tncry4ZJP9nl+z1OPjsQNVIxzZueuS9wDVucP+xnTu1W+sBN+3mO/kNSg==', CAST(N'2025-03-02T22:35:01.6942249' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'a711f1de-ca1c-4361-ba85-c5c0d36fa75a', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'Y/juW0myPUpG8hXljRN7mun2gQh7TsrTmNRbM0uTYLgv7qbwhmDuobBQ/7Hl/hw8tvucQWWSVlHN/aZ3qZoYCg==', CAST(N'2025-03-06T19:13:53.4254421' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'20887807-aa9a-4a88-b79c-c68ebdfe9066', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'AV3bz5PNJIWWULVysiAKAfjY71xNRwvtCVmRkhHzcs/GxAGyCYv56vYKqwtcN+sQDeU+IY4ij01hKSwOGnMLng==', CAST(N'2025-03-29T18:00:43.6633209' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'33a85275-eff6-4062-9073-c743e1fd0d3e', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'vjYhXB7xBsRBCQq69GFSzCLonSyMzjEgnaT1OFhhKWKLjHFrUFGieG+wcwNaG21q5xDJlYDZo3Sy2iR2lILa2w==', CAST(N'2025-03-28T13:29:03.0645191' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'e1fa6d7a-a391-40b5-83cd-c774d1aa6a92', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'mqZCkYjoDIANBTI7+FMN3SOU6uTM+gU6puH57Ea3U1v6+WR5mYq9plW8CelG2wCCbkfUvUYxO6w2e46yEt1bmQ==', CAST(N'2025-03-13T13:24:29.1676429' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'319d957c-f210-47f4-9167-c7c949a39c31', N'd87b4b72-609b-4979-b758-7771481da883', N'wFTCXZhzprWi9IG6DK6Aejv+pP3UJ1tLI4VlZfqz9nK7C55Xwm6kFs3flxTvJdNeNf8M79GMPaV9osjap8Pzyw==', CAST(N'2025-03-19T17:42:10.7662660' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'9fc636d0-e5ee-4f16-9c5a-c92d52af476d', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'cEg+obF9AsuOOF6l8YkbyIHzWStTKvYx2RkDwXHmkXBiHK8huK9xyEuq5DO6REfkRhayAJGhIoYpltlC9FnMJg==', CAST(N'2025-02-28T21:03:15.0948936' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'b98d0afe-b5ea-4c68-bace-c9b276417194', N'd87b4b72-609b-4979-b758-7771481da883', N'2gtuGrtg4rLAR346X+jmcVLbHiSU++uAE1Iob9hR435GW7DvZMxDZOXajsZTsi/yyTCLnXdbJJpyLA/YNIa72A==', CAST(N'2025-02-22T10:10:50.3096830' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'e5f24d90-5c80-4d35-bd7d-cc6cbed8bf2c', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'p1WAsx4BUQSzTtzKOaITO5+6uR0/YRySq3lFE7ltZhYR0wt169NN29Lq5hYqAv3wxrDGJe1K5rUOUgs19RxEHA==', CAST(N'2025-03-26T18:26:14.3621346' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'8ef003ee-93a3-47a1-80d2-cccd80059a6b', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'OCWgw47PAw1vGlqzkWEnL1mcn6Ira3YO1gOL30fLMxUVJDESikZZIQ1NUkfqW5UCUPd0QEmSKf67MkOad0mtMg==', CAST(N'2025-03-28T08:56:48.1026145' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'a8adb8af-9b36-4502-9ef7-cd47cbbcf559', N'd87b4b72-609b-4979-b758-7771481da883', N'2TmzYfPRdKhzGnDmNuN9LA9cGxT5DUqNxo3GEUgK+4V9EG50o8Oot/cQA36VfnEVXvYh6v+ZoeLO3tfEo8u8aQ==', CAST(N'2025-03-25T22:43:35.9131858' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'3d55318b-b1ff-41e7-8308-cd6062bc5512', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'yNf/I4TWm6AqXcLq23IYzDIQJYGIs7271YQup+s0jMyzin5U/IEt98N0efRjUTrcoKBIHH0+Cp3UYl2xF0ySfA==', CAST(N'2025-03-08T23:00:05.0399862' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'dff1617e-20f6-42b3-a52c-cd70699ce069', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'HLvGPOBNPHOj+vL6LZC9Xge7HNCuxiFMEUJwtayB7AnsufR4D5fEE50TcxyErjelhlIoodTtIHxY+KCUfDJiTA==', CAST(N'2025-02-21T15:18:04.0271512' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'8fd67c0c-f2e5-4ab2-8fa9-cd86691ddd0b', N'd87b4b72-609b-4979-b758-7771481da883', N'tf+qpXRDcKhJ+0R+MPgf1rtWOWefxF4DJq+BOLNijhSGoI0iX4TQMqtukf5MmK4V8hqmnw0QLstnuOEXHwUHWQ==', CAST(N'2025-03-02T08:48:00.2941203' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'6f771778-f3de-4ec2-8396-cdf976d25234', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'WzrHJgfj9E6jKOYNKdIyTW2evPPTeoGOtmlyfFkOfNR2Rlh3Lp4aE/dEGSCprCWvyOXDqQ+aRT2Wys8onqy1bQ==', CAST(N'2025-02-27T11:31:21.7334856' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'61886c3f-fb3e-4f00-8a40-cfd4d3e97ea0', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'3AWsvqodmN98gpjjq/PqphdpkTudjda+IEqrMmtEfkNwkxZhg0oDVe/7DvbEdeTA2tvEw7jObRe1BLzzMVaMsw==', CAST(N'2025-03-26T18:26:42.1503802' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'82a12220-fdb8-4fba-aba8-d08235e5fbfa', N'd87b4b72-609b-4979-b758-7771481da883', N'ymadPfZQn83QNIREg1UMD7Iw2xMigB8j+SZGupASPsA5CLCxC+IT5vslHDWACcgTq874o/kDiNKzVv0hTxpCdA==', CAST(N'2025-03-02T11:22:41.6892398' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'9c9cf016-fb38-471e-ac4e-d23390f7054b', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'4wpf7XGi8CJ0yyZqUFI1nIaAiueaeKWs3dg3LHw1HfhwXCxrmvs5NjcvIdSdgk4+ZxTF9FWWgxy9kYdmJctlpw==', CAST(N'2025-03-03T22:41:27.8400112' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'9f3915d6-6fd6-4a86-8f15-d24f72570ab8', N'023312e9-80c3-4262-80d4-18102e6bdc5b', N'vHB7xN7xUo4jqxFsrNpulCLoZBQK8dPz/xY3Q6H1TZdPW28ZUnntxcfDAZ/oCRdZAilGRnHqNw2JJftR4gtegA==', CAST(N'2025-03-28T09:56:59.8625585' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'821d9383-44aa-4756-9908-d2629bb5b585', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'S6Ej7eYLpdSCEqGjZOxpZBFeJeESiGuYjK7jeohuUWWjUOedUWydc1WBNJwf3uujeBWant0QVLB2mf1fu5TdNA==', CAST(N'2025-03-16T23:04:22.6889767' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'0d01e33a-0286-4672-a504-d264fc9a2cd9', N'd87b4b72-609b-4979-b758-7771481da883', N'vYuSd4RfVGSP2oROmTeRMtbcu2E9zRrckeY7U+kNLOK7v30SnN5lD6wN/URGDXMw5F1HP0EefyQ5DVjmcNntdQ==', CAST(N'2025-03-07T16:14:40.6587086' AS DateTime2))
GO
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'271ec0ae-de04-4a13-94af-d2d437d3da1f', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'LbhlSd0q//rQJFxifTT8iNQBRjVXkxcjp1uF5WmHaxdMPptUjD6cIWYLEl0Ph+aCm6Hxa0HyUXC7OJWg171ddw==', CAST(N'2025-02-26T16:48:42.4673096' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'3f29a739-ad46-4ad6-9a8c-d33734d3a0bb', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'M5DaTMrh+znYKeFZzi6EfFCQSlaK8huQm0jyUFeyzQOUQNBou6OMk8Uxo2zVFVp5MRIBrCOuQuzwP7DBuGxg2A==', CAST(N'2025-02-20T22:03:22.5864664' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'bd8a59bf-547d-42fb-8d40-d345d1686940', N'd87b4b72-609b-4979-b758-7771481da883', N'5Xz1ubCm2HeDhe6VyhzPXV6E/nONrXeJkvzdmv4ZufbrD+tYopAt8PhVbtrEvDHWy9yLKyVisTJFAitgT1VXsQ==', CAST(N'2025-02-28T21:27:20.5859628' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'97012784-fefd-488e-b109-d382c5426ce0', N'd87b4b72-609b-4979-b758-7771481da883', N'GOcSF0FF5rrVAvOdn4fFuqFYxAj2aZCbhpv+48EB2Xk00a5KMH/4PP4xRZOaFWTnQbVEHHOfD+wzHld50+Fp+Q==', CAST(N'2025-03-07T13:58:38.0313695' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'a80d4f08-5c3d-4935-8f2c-d3a93654afae', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'Oj91uVcW4LaYLPNwpjMdlNcW2RPIWcp3l/gaXGNNluYayXB+66VrrK9BvnXsA0tdMAhwSqWirDCQJQEqMQfDTg==', CAST(N'2025-03-16T13:32:43.0088981' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'dec5015d-1acc-481e-b78a-d3b600575784', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'MedDTXQGehubxza8CcI7kmLekkDMDV5VewAbiKA5r4l2M72g1xDwRZz/dHDgyRDCL/kz1i7W78vEP6IB9hrRrw==', CAST(N'2025-03-25T14:06:29.9289279' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'06be6342-a085-4c88-9151-d3c73f7523fe', N'f47f805a-17e4-4b75-9ad5-e4e07e011142', N'QaiCTpQT1OCpJcSYrk+pt4wWfH/ZzWjBhtfccxHDJs9mzmm3wvneDSKC3hf9a5NIazIjQn0MhCoE6XOa2ppTmw==', CAST(N'2025-03-28T08:43:40.2096559' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'77600b0b-35e0-4875-a0d8-d4a40b3de2ba', N'd87b4b72-609b-4979-b758-7771481da883', N'FzFQojGF6Q9SVPYWRf99+48pQoQ+m3gaDhRUvtJcxQuZxgn3XFBCaWdY1kkO/Hxe/AvDqkjAg/yvKzxBzZjVew==', CAST(N'2025-03-04T08:43:07.7661363' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'ddcfb824-283f-4e7e-bbc6-d6391673a2d9', N'd87b4b72-609b-4979-b758-7771481da883', N'LlocmVXBMzfHwtZP0Q8ZZZ8XFgmNsEO9zGzWC7MJYqMMU6r8ZV7XZXmWj2KFimpN+E66XaPe4SRT0MEoDcUoQA==', CAST(N'2025-03-26T18:09:06.6989663' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'41e5a58e-70f5-4670-9c0b-d645df5a58ee', N'd87b4b72-609b-4979-b758-7771481da883', N'TLfDL+A+OL3DUKcpZtOJMdFYkQaZXpIWNTZXgoBCus0JGIUZrO3hEMABWNqECnmW/q6vRawZyOb8TjqBg8BXlw==', CAST(N'2025-03-28T13:38:13.4652617' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'a2520a83-cbea-40b7-bf13-d683a9e36c8b', N'd87b4b72-609b-4979-b758-7771481da883', N'9N0d9FfWH2mLFR2IJsizllI3v1wOo1PTo+pQ5Qq1LLilKwDz+eE9nQTiuzZynsz4WGts6EOZI/7RUYaIR/0eMA==', CAST(N'2025-02-25T17:08:09.8580874' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'ff4861b1-ef1c-42f3-8145-d801e4ef9790', N'd87b4b72-609b-4979-b758-7771481da883', N'ut/cxGuhUb/0ttgeP4UKWECuQpNE0P3Zn+OZtYStdSZibj6lSXegNjtTE+9wN3Wl3h43GO890ic/Lkydae5B7A==', CAST(N'2025-02-24T20:49:34.5216736' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'99294a02-3f89-4a04-8c25-d9fe66775d0e', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'pUC5Y+FngrQ1+5IsOF6dSQHHjnmWQemzH1labPyZRiaTtng3WE5lUeMMn47rjn32HYgru0lF/wodzR/Z3OtlNA==', CAST(N'2025-03-18T12:07:29.5692789' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'99df2cf2-0178-455e-afb8-dbbd3973d5e3', N'd87b4b72-609b-4979-b758-7771481da883', N'Ea0F36m/BrgOsiuOG/VxP5JG/AAQ2FMNxAa//popT8n2v3kAt7OSUhUz+T1xj9hsycOlX3NVM5gls69/tFr8YA==', CAST(N'2025-02-22T14:22:22.7724305' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'b0a83a67-3490-45d7-95ad-ddaf4fc490b5', N'd87b4b72-609b-4979-b758-7771481da883', N'r+NfRUBd/Wpwx00pPTs8bcVt/CIHZDKOAWLagDj+JKf9muKf2hci+YNnGcH13VgDCwVOZdWCmerQyYignYxEtw==', CAST(N'2025-02-27T14:12:57.1170975' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'35890bd6-ecc3-4b3c-b796-ded860582360', N'd87b4b72-609b-4979-b758-7771481da883', N'x9kTxA+nIKnMyYWocM+qQYhpv/pc8UN6YU97ugfaANE0DeWrcmwc301y9tFXZXM7ooB3tOtLiqgfTjeN5Nc2ug==', CAST(N'2025-03-02T13:46:06.5822703' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'd7b60346-c04c-4749-b187-df639a03bf94', N'd87b4b72-609b-4979-b758-7771481da883', N'GNTpnik/j7PaWnYSCH5kAFzcgHnFP32UGfb0zpwnPxJiNEFxtXIBJS0WeQIJ59bGROLy7j7RecZnQg4vQPY4gA==', CAST(N'2025-03-26T18:21:48.5237784' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'33457bac-e310-4826-80fd-dfdf9f14aff6', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'NJZKbTimrDELA5YRoIet4/Y14kwu3YfUW80zrXP+Slht6eRXzbAXKkFPa4TVfTmVDmibUYX6/4JYc8P08qV5cw==', CAST(N'2025-03-08T22:23:12.5624268' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'17fe79a1-5673-4085-a123-e04dddbc49a3', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'HQH3hMBfRw0VNArCwlNdW9vJDCBSIhELmucghEryZZkqUBKK+5/gVE1MZAMRTmN+I9jbCHIZ6VAlAzti4YLM+A==', CAST(N'2025-03-08T21:55:14.0385133' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'39f64a98-f640-4fde-8543-e10744e962c6', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'guNRkb7/zWW6k5BJg6igef1z4vJT1n2Xhu5D/Ty71Ss7Ccu+hGVZMbWLQn9YMbWcpfTTE4AapDav1B/srxkPYg==', CAST(N'2025-03-18T13:09:08.4158148' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'f63e7f1f-bc7c-4957-aa03-e1a784318510', N'd87b4b72-609b-4979-b758-7771481da883', N'HXNctXICnvAGr0atTl00mblGkH+BA4LqjXazhw0j1foAME2V4YZ949IJc6XDvlsgwKLvw2EncNV4PKRGx6P4NQ==', CAST(N'2025-03-25T17:30:59.6234173' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'ec6f1e42-e0e4-4dfd-8e9f-e2abe18b013e', N'd87b4b72-609b-4979-b758-7771481da883', N'g57Z6GGAmY9ryMndsCs/ZIa+m4mdnf2B+uigL2YYoopdoNePu9+F4CS7cFN6DchZ7KQNffRRHMnUx8psOOu6Ag==', CAST(N'2025-03-27T16:35:58.0533291' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'd22c0e0a-aae1-422d-afb9-e32c01540eb7', N'd87b4b72-609b-4979-b758-7771481da883', N'8yBgMUajxiXo8gIYBIU8e0xFdWFL5IyuPN5SZC4q+q87438MnSv1aJhmbOdsiKSLNMkP/DFvhrb1Dd0VaoCmKQ==', CAST(N'2025-02-28T17:15:31.0145169' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'bdc1cde2-7bc6-451e-9311-e52b568bc789', N'd87b4b72-609b-4979-b758-7771481da883', N'qIctueIJC+SntqjB2+x5igVxzfyaFzrLprR7iL1qsKK20KZBj8Ypo2I5c2R/0wf3N1PRBdP1SNmBcT8vZh3wHQ==', CAST(N'2025-02-23T10:47:17.5982466' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'd18c18f9-468b-4002-94ee-e720ff806687', N'd87b4b72-609b-4979-b758-7771481da883', N'81w0IYCjPJtSA8n1uGDENB2K03Imo3xJG91bkD7H366RzqHyqkI8pgqfrX8I74wktZtKXNYTkqtyCGWkZa7OUQ==', CAST(N'2025-02-25T16:41:03.8566803' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'7e2f5c97-53d2-41f2-81eb-ea80f05fdfd3', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'vtc96JV49Sv3wrOd57QX1TVlnc8sGVFwN8SZB9kXUrusEtIP6Dq8vmIgi5LEKqRjm9TZCh/IBOnt2YNxKrBBaA==', CAST(N'2025-03-16T14:53:56.7847187' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'd9493af6-b377-405f-9ff6-ec07578fc855', N'd87b4b72-609b-4979-b758-7771481da883', N'GOBySCWzyaaKqpd4YHObo966WQlt8x7KtSInr2USJ56Lf3kERs17iSsUXDsLl2CnrAb3YTR7I0ZWDKyEb36Iwg==', CAST(N'2025-03-01T20:42:06.7102199' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'90796d1b-3a28-40ff-ac04-ec3a0e1cc65d', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'J0sD4lJRuStC/DTMeWVVNJZGRRjqgUlH2jCY8f8zkk6Dq4BI9m2/5frCMvf38GEmjzL52c6UeBaXFPyXyvj+SA==', CAST(N'2025-03-05T22:00:07.5015099' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'1c00f3fa-3065-4223-b34a-ec4159bc7c94', N'd87b4b72-609b-4979-b758-7771481da883', N'kB7lAPEVgQy5yCjt4gBLubsrIShUL3uSqhWFjRyOrwQLePr4nBT6P9FEkhrEmvjcJtZNtQTI7v+Ch43k2B2izg==', CAST(N'2025-02-25T08:47:43.5550627' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'4db33a7d-9898-4743-84ef-edaa19d20bcf', N'a0f49e77-2239-4dd7-80d9-156d6769b0f7', N'5RE6sms47zVIdnWmM3ocCvAtwFxYZbduQh/sAKRc1c9O0u9rA2Ptfn/qiDB/ZpJQz6/aI54MpyOY9bLlJLlnEA==', CAST(N'2025-03-05T15:10:28.9917234' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'48873f23-ed3f-43a2-9800-ee94c16d0f36', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'sKS/AmHv0TT6nHivZqamo9DIKeRzyfZfy/gs6BCBNItlvkfgg7ygZZU/2M8ZaZt7MutHtGq9104qt1177rYOTw==', CAST(N'2025-03-30T09:21:32.4355985' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'5625003e-a7d1-4a00-a78c-f094ec13afa5', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'ph085GEYBLd2aejHw+cTUZWuW+4U7liwVLnnJAlAY8tK59MVlFkvmY6PxFBf6V5DJmGe7X9SPFhP8y1wfSB2Kw==', CAST(N'2025-02-22T11:25:09.9901465' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'0068ccb7-b680-476b-b021-f147c303133e', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'LrYy04mQi1+5XIHAErZKq4j9Cw36SV/EGzUJ/COjbl38AgbC2j/dOncgnqx6Ucknem6frmKxa59Wcy1NnJWQEA==', CAST(N'2025-02-27T08:54:13.1810317' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'b6c25861-73fd-4e2d-be02-f1e2d6769a17', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'HGO42CYWbnnioD/QuY7YB2LDXUFiIuF2K4ueHcB0PQRhpgVF8ycp5uXER6Far1MaIfqzsZXGU8jO1mnYBF6aHg==', CAST(N'2025-03-28T12:41:35.4529262' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'ff8f4dbd-e350-4548-be37-f6169b40dedc', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'CyZu4nrF6IHU5NjVKvI1jKkH9TZAuZe0GYAA9OsKglBFdDC+MkRgN9elFovMJtC3MtcYGdWXUolFL3F115vPrg==', CAST(N'2025-02-20T22:01:33.8742624' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'52477b7c-d23d-485b-a197-f7ec0718449e', N'd87b4b72-609b-4979-b758-7771481da883', N'DtNugnC6ufmxA0LWBAt+uOPML3fiqfATEEy0wEtsloMoa4iEp7TQSMQUpDxEIWWryYTOpkm3570fTJWnZgQ8FQ==', CAST(N'2025-03-27T20:39:23.2237108' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'72b6c60c-bb27-4e24-9b12-f82daf2d8296', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'p1e3CFCl/SiigAa8pEeT3hHM4CZg5V1uJowlWzAF0eFPrY6FeU6Dd4qaBrhLcokYeqm/Rb5Gc8d/grd8/cD4UA==', CAST(N'2025-03-26T18:30:29.9472809' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'9d31d894-5b10-47d4-b900-f8a250dc7f2d', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'UgJIKMD2bRg5WjKtfA2D/h0rA76frAHt/1Kedr6adUz8tQQ6EG58xr8r0IdGgesNl7po8c6W9X4uGsvlAzBG3w==', CAST(N'2025-03-28T14:22:40.3295417' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'fcdd415e-c7d7-4c43-a94b-f9121ca4ad88', N'd87b4b72-609b-4979-b758-7771481da883', N'MqsJ9OgN+oKBdNeLU2cdPhCC4w9aTIiGDAT1mrLM+aXD/kgY4yIKYzK/Ic84GfMC55OcDkPDNhHrNl7HcC9LzQ==', CAST(N'2025-03-25T22:54:52.6000143' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'ae1fdb92-9a99-41c8-aeed-f91e8be100f5', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'4RrJel61xYhpmqf825tHVWmP7FKqytaA9bxJ8SP+MnfvyOD60HHO46Js0F6Pn2FijrKJFHoiSP1jdF1YJIpMaQ==', CAST(N'2025-02-26T10:27:43.7003458' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'14668fac-3341-43b6-9a14-fa1ebdc04f8f', N'd87b4b72-609b-4979-b758-7771481da883', N'Byg1R1aXb2f9C6bJcFWCul2FeKYvtAB8SRwbaddBQh8fcf8LyNsxG/qCh5K23ztBCZQF7JX7Az9J+DbGRVccgw==', CAST(N'2025-03-25T17:30:41.6404539' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'6ff6af2f-99a1-412a-a7a7-fa75abea982f', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'J/wmryOeqxu8YzbVqNy/s8RWgJ72KnOfocAQz5HrxfJ5Tj50h3/oo03cGVflEbsVyIfvVzYPevDIdUVVXMhVIw==', CAST(N'2025-03-16T12:08:15.1798996' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'8c22423e-f047-4a30-bb13-fa9f9f84da3a', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'PRiJ2bZ/v0NJCPKDBeFk+ieE4c6Y+9T7gv1b7vFIWSvVphbJID0G+AElqAgjprFlIMmMR8oWTp+3Ub+CkfhRvg==', CAST(N'2025-03-28T13:11:55.6244217' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'f88e9892-e67e-4689-99d4-faef02f15aff', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'jekDx8lI2PSjfk7/owcSukUlL29NPAWnoBWyr2vOvH1aQnd0b7jh8hIoh47yutUZVu9z+x65AT51pj8pqWzDFA==', CAST(N'2025-02-25T16:30:35.3345083' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'20295f44-8191-47c9-8b4d-fc1bd17f190a', N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'ExISHuITUVzqD7b8FAPoLX84iKgOQ9jhWFop9XXq4T4YVQTsq9cIESIzg7Azj3O6MTRBPHroxY0wUY5/VJrQ1w==', CAST(N'2025-03-29T14:06:06.3453960' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'a445cd6a-18d2-4dc0-85ac-fc3bdeb5abeb', N'd87b4b72-609b-4979-b758-7771481da883', N'7crGYAIXA2fTvT8pZjhQ2gRZM0fLdClwFNUoouHM90iq3Urf+5V16Vg4hZlo1FiDc3dZvF35Ihhq1lwt9KkahA==', CAST(N'2025-03-27T16:35:43.3957274' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'9ca11c27-32b3-45ec-91d6-fe46fd489b93', N'd87b4b72-609b-4979-b758-7771481da883', N'MCWfMRhqqVpb6n8Q98ycdWFTtVynHEzlRoVT9mW0f52i12Mm8+OTKf4nJ2Dq95ClPvJeGV+/NDw114ps9ZzBXw==', CAST(N'2025-02-28T16:56:56.2576100' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'6fdd9037-8ff7-4e26-81fb-fed9cac15a93', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'GTAAKgqdmrjLc+OaJFuh/bxh9HZINdWK0asZNMi9EpUpL7DXUddntPEMPOA5miJaWCS0fJqdtlY1+5x79KM5WQ==', CAST(N'2025-03-28T13:54:12.6672230' AS DateTime2))
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'167999c9-ed1e-4b18-b344-ff304328cc30', N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'umUCgHGuOsTdfAYdLZYpDT7zIPra0ztKZtKBE5IZ4ds3WE4llbVwzASZQhOUXr5QHROlj7uWbilYo/TZf5H+6g==', CAST(N'2025-02-27T14:08:48.6713599' AS DateTime2))
 
GO
INSERT [dbo].[Refunds] ([TransactionID], [Status], [RefundID]) VALUES (2503172305147164, 0, 2503251537326355)
INSERT [dbo].[Refunds] ([TransactionID], [Status], [RefundID]) VALUES (2503270847230383, 1, 2503270848198118)
INSERT [dbo].[Refunds] ([TransactionID], [Status], [RefundID]) VALUES (2503270851355261, 1, 2503270852088544)
INSERT [dbo].[Refunds] ([TransactionID], [Status], [RefundID]) VALUES (2503271310275306, 0, 2503271311091482)
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 

INSERT [dbo].[Roles] ([Id], [Name]) VALUES (1, N'Admin')
INSERT [dbo].[Roles] ([Id], [Name]) VALUES (2, N'Manager')
INSERT [dbo].[Roles] ([Id], [Name]) VALUES (3, N'User')
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO


INSERT [dbo].[Users] ([Id], [FullName], [Email], [Phone], [Address], [BirhDay], [Gender], [Avatar], [CitizenID], [PasswordHash], [IsEmailConfirmed], [IsDeleted], [RoleId], [CreatedAt], [LastModifiedAt]) VALUES (N'ce001f33-0ee0-4faa-a7e5-06e18fe4f004', N'A', N'Abc@gmail.com', N'0912345678', NULL, NULL, NULL, NULL, NULL, N'$2a$11$7vrd2xCyAOXyB2r9iLnyhe9qUz4ACsUfwbZy5CnQU5ZWGoRH22akO', 0, 0, 1, CAST(N'2025-03-01T22:39:40.9322400' AS DateTime2), CAST(N'2025-03-01T22:39:40.9322415' AS DateTime2))
INSERT [dbo].[Users] ([Id], [FullName], [Email], [Phone], [Address], [BirhDay], [Gender], [Avatar], [CitizenID], [PasswordHash], [IsEmailConfirmed], [IsDeleted], [RoleId], [CreatedAt], [LastModifiedAt]) VALUES (N'aa1d6178-8c7d-4a48-aaf9-13ee8f8cccda', N'Nguyen Anh Vu', N'vunahe160147@fpt.edu.vn', N'0868137027', NULL, NULL, NULL, NULL, NULL, N'$2a$11$HrH6XthwZTOCx1g46InZbetUK14dzBtbERsgWMxOEhZURmGKOixPa', 0, 0, 2, CAST(N'2025-03-04T14:27:07.3093970' AS DateTime2), CAST(N'2025-03-04T14:27:07.3093986' AS DateTime2))
INSERT [dbo].[Users] ([Id], [FullName], [Email], [Phone], [Address], [BirhDay], [Gender], [Avatar], [CitizenID], [PasswordHash], [IsEmailConfirmed], [IsDeleted], [RoleId], [CreatedAt], [LastModifiedAt]) VALUES (N'4b7b0200-70f9-416a-9a3f-29ccab0deec4', N'staff', N'user2@gmail.com', N'0987654123', N'Bình Thủy, Cần Thơ', NULL, NULL, NULL, NULL, N'$2a$11$2DckkViJcREkc7Xi32kYuO6uJMQRbs3Z3W/rjHByCjxjnfpSCRKim', 1, 0, 3, CAST(N'2025-02-19T18:55:30.3867530' AS DateTime2), CAST(N'2025-02-19T18:55:30.3867532' AS DateTime2))
INSERT [dbo].[Users] ([Id], [FullName], [Email], [Phone], [Address], [BirhDay], [Gender], [Avatar], [CitizenID], [PasswordHash], [IsEmailConfirmed], [IsDeleted], [RoleId], [CreatedAt], [LastModifiedAt]) VALUES (N'd48d2dcd-7083-4395-8486-4375f6ad0de2', N'B', N'khanglam704@gmail.com', N'0904081667', NULL, NULL, NULL, NULL, NULL, N'$2a$11$2DckkViJcREkc7Xi32kYuO6uJMQRbs3Z3W/rjHByCjxjnfpSCRKim', 1, 0, 3, CAST(N'2025-03-04T23:09:07.6814074' AS DateTime2), CAST(N'2025-03-04T23:09:07.6814087' AS DateTime2))
INSERT [dbo].[Users] ([Id], [FullName], [Email], [Phone], [Address], [BirhDay], [Gender], [Avatar], [CitizenID], [PasswordHash], [IsEmailConfirmed], [IsDeleted], [RoleId], [CreatedAt], [LastModifiedAt]) VALUES (N'd87b4b72-609b-4979-b758-7771481da883', N'admin', N'admin@gmail.com', N'0987654321', N'Ninh Kiều, Cần Thơ', NULL, NULL, NULL, NULL, N'$2a$11$2DckkViJcREkc7Xi32kYuO6uJMQRbs3Z3W/rjHByCjxjnfpSCRKim', 1, 0, 1, CAST(N'2025-02-19T18:55:30.2753676' AS DateTime2), CAST(N'2025-02-19T18:55:30.2753683' AS DateTime2))
INSERT [dbo].[Users] ([Id], [FullName], [Email], [Phone], [Address], [BirhDay], [Gender], [Avatar], [CitizenID], [PasswordHash], [IsEmailConfirmed], [IsDeleted], [RoleId], [CreatedAt], [LastModifiedAt]) VALUES (N'6ad278e4-ac8f-477d-8d1b-81d594e0fb58', N'Duong Cong son', N'sondche161827@fpt.edu.vn', N'0904081663', NULL, NULL, NULL, NULL, NULL, N'$2a$11$8Cent7tU/xT8OlHah2/0SuTPOEumpb0Ay9I0ESs2GVrNam20ezoQe', 1, 1, 2, CAST(N'2025-02-24T16:48:16.0989086' AS DateTime2), CAST(N'2025-02-24T16:48:16.0989095' AS DateTime2))
GO
INSERT [dbo].[UserVoucher] ([UserID], [VoucherID], [isUsed]) VALUES (N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'fbfccb7b-77d2-4487-9c21-3eee1bab4e88', 1)
INSERT [dbo].[UserVoucher] ([UserID], [VoucherID], [isUsed]) VALUES (N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'3d80cfe9-584a-4b7c-a62c-d55316e01195', 1)
INSERT [dbo].[UserVoucher] ([UserID], [VoucherID], [isUsed]) VALUES (N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'6a7ca449-6850-44c5-ab6e-e4b0eafa4d60', 1)
GO
INSERT [dbo].[Voucher] ([Id], [Image], [Code], [Discount], [Description], [QuantityUsed], [StartDate], [EndDate], [isDeleted]) VALUES (N'c92580e4-45d3-4a8b-bbe9-245f5378cc29', N'https://homestaybooking-001-site1.ntempurl.com/images/97e63407-5be8-4223-b6e8-7a67e1e7dbc8_C2 (1).png', N'DGMaig', 12, N'voucher description', 12, CAST(N'2025-03-28T00:00:00.0000000' AS DateTime2), CAST(N'2025-04-27T00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Voucher] ([Id], [Image], [Code], [Discount], [Description], [QuantityUsed], [StartDate], [EndDate], [isDeleted]) VALUES (N'fbfccb7b-77d2-4487-9c21-3eee1bab4e88', N'https://homestaybooking-001-site1.ntempurl.com/images/c4837b15-2e31-4e39-9fc6-60e53c842308_Black and Pink Colorful Illustrations Tic Tac Toe Fun Presentation.png', N'LrTCji', 10, N'Voucher 01 Des', 1, CAST(N'2025-02-27T00:00:00.0000000' AS DateTime2), CAST(N'2025-05-09T00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Voucher] ([Id], [Image], [Code], [Discount], [Description], [QuantityUsed], [StartDate], [EndDate], [isDeleted]) VALUES (N'3d80cfe9-584a-4b7c-a62c-d55316e01195', N'https://homestaybooking-001-site1.ntempurl.com/images/c4837b15-2e31-4e39-9fc6-60e53c842308_Black and Pink Colorful Illustrations Tic Tac Toe Fun Presentation.png', N'LrTCji', 10, N'Voucher 01 Des', 1, CAST(N'2025-02-28T00:00:00.0000000' AS DateTime2), CAST(N'2025-04-03T00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Voucher] ([Id], [Image], [Code], [Discount], [Description], [QuantityUsed], [StartDate], [EndDate], [isDeleted]) VALUES (N'6a7ca449-6850-44c5-ab6e-e4b0eafa4d60', N'https://homestaybooking-001-site1.ntempurl.com/images/785b43c6-9714-44a0-8d17-bbde7ee673e5_voucher 1.3.jpg', N'rgeoUj', 20, N'Giảm chơi cho vui', -1, CAST(N'2025-03-25T00:00:00.0000000' AS DateTime2), CAST(N'2025-04-24T00:00:00.0000000' AS DateTime2), 0)
GO
ALTER TABLE [dbo].[Facility] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[HomeStayFacility] ADD  DEFAULT ((0)) FOR [Quantity]
GO
ALTER TABLE [dbo].[Booking]  WITH CHECK ADD  CONSTRAINT [FK_Booking_Users_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Booking] CHECK CONSTRAINT [FK_Booking_Users_UserID]
GO
ALTER TABLE [dbo].[Calendar]  WITH CHECK ADD  CONSTRAINT [FK_Calendar_Booking_BookingID] FOREIGN KEY([BookingID])
REFERENCES [dbo].[Booking] ([Id])
GO
ALTER TABLE [dbo].[Calendar] CHECK CONSTRAINT [FK_Calendar_Booking_BookingID]
GO
ALTER TABLE [dbo].[Calendar]  WITH CHECK ADD  CONSTRAINT [FK_Calendar_HomeStay_HomeStayID] FOREIGN KEY([HomeStayID])
REFERENCES [dbo].[HomeStay] ([Id])
GO
ALTER TABLE [dbo].[Calendar] CHECK CONSTRAINT [FK_Calendar_HomeStay_HomeStayID]
GO
ALTER TABLE [dbo].[CommentPost]  WITH CHECK ADD  CONSTRAINT [FK_CommentPost_CommentPost_ParrentID] FOREIGN KEY([ParrentID])
REFERENCES [dbo].[CommentPost] ([Id])
GO
ALTER TABLE [dbo].[CommentPost] CHECK CONSTRAINT [FK_CommentPost_CommentPost_ParrentID]
GO
ALTER TABLE [dbo].[CommentPost]  WITH CHECK ADD  CONSTRAINT [FK_CommentPost_Post_PostID] FOREIGN KEY([PostID])
REFERENCES [dbo].[Post] ([Id])
GO
ALTER TABLE [dbo].[CommentPost] CHECK CONSTRAINT [FK_CommentPost_Post_PostID]
GO
ALTER TABLE [dbo].[CommentPost]  WITH CHECK ADD  CONSTRAINT [FK_CommentPost_Users_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[CommentPost] CHECK CONSTRAINT [FK_CommentPost_Users_UserID]
GO
ALTER TABLE [dbo].[EmailConfirmationTokens]  WITH CHECK ADD  CONSTRAINT [FK_EmailConfirmationTokens_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[EmailConfirmationTokens] CHECK CONSTRAINT [FK_EmailConfirmationTokens_Users_UserId]
GO
ALTER TABLE [dbo].[FeedBack]  WITH CHECK ADD  CONSTRAINT [FK_FeedBack_HomeStay_HomeStayID] FOREIGN KEY([HomeStayID])
REFERENCES [dbo].[HomeStay] ([Id])
GO
ALTER TABLE [dbo].[FeedBack] CHECK CONSTRAINT [FK_FeedBack_HomeStay_HomeStayID]
GO
ALTER TABLE [dbo].[FeedBack]  WITH CHECK ADD  CONSTRAINT [FK_FeedBack_Users_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[FeedBack] CHECK CONSTRAINT [FK_FeedBack_Users_UserID]
GO
ALTER TABLE [dbo].[HomeStay]  WITH CHECK ADD  CONSTRAINT [FK_HomeStay_Users_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[HomeStay] CHECK CONSTRAINT [FK_HomeStay_Users_UserID]
GO
ALTER TABLE [dbo].[HomestayAmenity]  WITH CHECK ADD  CONSTRAINT [FK_HomestayAmenity_Amenity_AmenityId] FOREIGN KEY([AmenityId])
REFERENCES [dbo].[Amenity] ([Id])
GO
ALTER TABLE [dbo].[HomestayAmenity] CHECK CONSTRAINT [FK_HomestayAmenity_Amenity_AmenityId]
GO
ALTER TABLE [dbo].[HomestayAmenity]  WITH CHECK ADD  CONSTRAINT [FK_HomestayAmenity_HomeStay_HomeStayID] FOREIGN KEY([HomeStayID])
REFERENCES [dbo].[HomeStay] ([Id])
GO
ALTER TABLE [dbo].[HomestayAmenity] CHECK CONSTRAINT [FK_HomestayAmenity_HomeStay_HomeStayID]
GO
ALTER TABLE [dbo].[HomeStayFacility]  WITH CHECK ADD  CONSTRAINT [FK_HomeStayFacility_Facility_FacilityID] FOREIGN KEY([FacilityID])
REFERENCES [dbo].[Facility] ([Id])
GO
ALTER TABLE [dbo].[HomeStayFacility] CHECK CONSTRAINT [FK_HomeStayFacility_Facility_FacilityID]
GO
ALTER TABLE [dbo].[HomeStayFacility]  WITH CHECK ADD  CONSTRAINT [FK_HomeStayFacility_HomeStay_HomeStayID] FOREIGN KEY([HomeStayID])
REFERENCES [dbo].[HomeStay] ([Id])
GO
ALTER TABLE [dbo].[HomeStayFacility] CHECK CONSTRAINT [FK_HomeStayFacility_HomeStay_HomeStayID]
GO
ALTER TABLE [dbo].[HomeStayImage]  WITH CHECK ADD  CONSTRAINT [FK_HomeStayImage_HomeStay_HomeStayID] FOREIGN KEY([HomeStayID])
REFERENCES [dbo].[HomeStay] ([Id])
GO
ALTER TABLE [dbo].[HomeStayImage] CHECK CONSTRAINT [FK_HomeStayImage_HomeStay_HomeStayID]
GO
ALTER TABLE [dbo].[Post]  WITH CHECK ADD  CONSTRAINT [FK_Post_Users_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Post] CHECK CONSTRAINT [FK_Post_Users_UserID]
GO
ALTER TABLE [dbo].[PostImage]  WITH CHECK ADD  CONSTRAINT [FK_PostImage_Post_PostID] FOREIGN KEY([PostID])
REFERENCES [dbo].[Post] ([Id])
GO
ALTER TABLE [dbo].[PostImage] CHECK CONSTRAINT [FK_PostImage_Post_PostID]
GO
ALTER TABLE [dbo].[RefreshTokens]  WITH CHECK ADD  CONSTRAINT [FK_RefreshTokens_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[RefreshTokens] CHECK CONSTRAINT [FK_RefreshTokens_Users_UserId]
GO
ALTER TABLE [dbo].[Refunds]  WITH CHECK ADD  CONSTRAINT [FK_Refunds_Transactions] FOREIGN KEY([TransactionID])
REFERENCES [dbo].[Transactions] ([Id])
GO
ALTER TABLE [dbo].[Refunds] CHECK CONSTRAINT [FK_Refunds_Transactions]
GO
ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [FK_Transactions_Booking_BookingID] FOREIGN KEY([BookingID])
REFERENCES [dbo].[Booking] ([Id])
GO
ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [FK_Transactions_Booking_BookingID]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Roles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([Id])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Roles_RoleId]
GO
ALTER TABLE [dbo].[UserVoucher]  WITH CHECK ADD  CONSTRAINT [FK_UserVoucher_Users_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[UserVoucher] CHECK CONSTRAINT [FK_UserVoucher_Users_UserID]
GO
ALTER TABLE [dbo].[UserVoucher]  WITH CHECK ADD  CONSTRAINT [FK_UserVoucher_Voucher_VoucherID] FOREIGN KEY([VoucherID])
REFERENCES [dbo].[Voucher] ([Id])
GO
ALTER TABLE [dbo].[UserVoucher] CHECK CONSTRAINT [FK_UserVoucher_Voucher_VoucherID]
GO
