Create database [HomeStayBookingV2] 
USE [HomeStayBookingV2]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 2/13/2025 9:10:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Amenity]    Script Date: 2/13/2025 9:10:24 PM ******/
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
/****** Object:  Table [dbo].[Booking]    Script Date: 2/13/2025 9:10:24 PM ******/
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
	[VoucherID] [uniqueidentifier] NOT NULL,
	[HomeStayID] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Booking] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Calendar]    Script Date: 2/13/2025 9:10:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Calendar](
	[Id] [uniqueidentifier] NOT NULL,
	[Date] [datetime2](7) NOT NULL,
	[Price] [decimal](18, 4) NOT NULL,
	[HomeStayID] [uniqueidentifier] NOT NULL,
	[isDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Calendar] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CommentPost]    Script Date: 2/13/2025 9:10:24 PM ******/
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
/****** Object:  Table [dbo].[EmailConfirmationTokens]    Script Date: 2/13/2025 9:10:24 PM ******/
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
/****** Object:  Table [dbo].[FeedBack]    Script Date: 2/13/2025 9:10:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FeedBack](
	[Id] [uniqueidentifier] NOT NULL,
	[Rating] [int] NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[isDeleted] [bit] NOT NULL,
	[UserID] [uniqueidentifier] NOT NULL,
	[HomeStayID] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_FeedBack] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HomeStay]    Script Date: 2/13/2025 9:10:24 PM ******/
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
	[Address] [nvarchar](255) NOT NULL,
	[City] [nvarchar](255) NOT NULL,
	[isBooked] [bit] NOT NULL,
	[CheckInTime] [nvarchar](255) NOT NULL,
	[CheckOutTime] [nvarchar](255) NOT NULL,
	[UserID] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_HomeStay] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HomestayAmenity]    Script Date: 2/13/2025 9:10:24 PM ******/
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
/****** Object:  Table [dbo].[HomeStayImage]    Script Date: 2/13/2025 9:10:24 PM ******/
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
/****** Object:  Table [dbo].[Post]    Script Date: 2/13/2025 9:10:24 PM ******/
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
/****** Object:  Table [dbo].[PostImage]    Script Date: 2/13/2025 9:10:24 PM ******/
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
/****** Object:  Table [dbo].[RefreshTokens]    Script Date: 2/13/2025 9:10:24 PM ******/
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
/****** Object:  Table [dbo].[Roles]    Script Date: 2/13/2025 9:10:24 PM ******/
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
/****** Object:  Table [dbo].[Users]    Script Date: 2/13/2025 9:10:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [uniqueidentifier] NOT NULL,
	[FullName] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[Phone] [nvarchar](10) NOT NULL,
	[Address] [nvarchar](250) NOT NULL,
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
/****** Object:  Table [dbo].[UserVoucher]    Script Date: 2/13/2025 9:10:24 PM ******/
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
/****** Object:  Table [dbo].[Voucher]    Script Date: 2/13/2025 9:10:24 PM ******/
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
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250213041700_dbinit', N'8.0.12')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250213073104_updateDB', N'8.0.12')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250213073431_updateDB1', N'8.0.12')
GO
INSERT [dbo].[Amenity] ([Id], [Name], [isDeleted]) VALUES (N'89c51fb0-c306-4f8b-b5b7-0c24ca2e6241', N'Free Wifi', 0)
INSERT [dbo].[Amenity] ([Id], [Name], [isDeleted]) VALUES (N'4fa1544c-5f4d-45bb-a53d-75c402456715', N'Swimming Pool', 0)
INSERT [dbo].[Amenity] ([Id], [Name], [isDeleted]) VALUES (N'3e8ce9dc-aeaa-4fb1-b76d-bea4be1b8638', N'Breakfast Included', 0)
INSERT [dbo].[Amenity] ([Id], [Name], [isDeleted]) VALUES (N'f1b218c9-17f0-43c4-b8db-f69c73440f5e', N'Air Conditioning', 0)
GO
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID], [VoucherID], [HomeStayID]) VALUES (N'6aa18d4f-5c01-41ac-b069-0a6aa4eefcc4', CAST(N'2025-09-10T00:00:00.0000000' AS DateTime2), CAST(N'2025-09-12T00:00:00.0000000' AS DateTime2), CAST(1000.0000 AS Decimal(18, 4)), CAST(500.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'4b7b0200-70f9-416a-9a3f-29ccab0deec4', N'347a8e25-01e0-44c0-8e84-1466150b1692', N'95e13923-0c46-475b-a1e3-0ddf9defa7e5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID], [VoucherID], [HomeStayID]) VALUES (N'347a8e25-01e0-44c0-8e84-1466150b1696', CAST(N'2025-02-11T00:00:00.0000000' AS DateTime2), CAST(N'2025-02-13T00:00:00.0000000' AS DateTime2), CAST(1000.0000 AS Decimal(18, 4)), CAST(500.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'4b7b0200-70f9-416a-9a3f-29ccab0deec4', N'347a8e25-01e0-44c0-8e84-1466150b1692', N'95e13923-0c46-475b-a1e3-0ddf9defa7e5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID], [VoucherID], [HomeStayID]) VALUES (N'76cb25de-c599-48cb-838c-1fdc5b3db551', CAST(N'2025-08-10T00:00:00.0000000' AS DateTime2), CAST(N'2025-08-12T00:00:00.0000000' AS DateTime2), CAST(1000.0000 AS Decimal(18, 4)), CAST(500.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'4b7b0200-70f9-416a-9a3f-29ccab0deec4', N'347a8e25-01e0-44c0-8e84-1466150b1692', N'95e13923-0c46-475b-a1e3-0ddf9defa7e5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID], [VoucherID], [HomeStayID]) VALUES (N'2de4bb6e-e180-4d0d-879d-2d460e8d4416', CAST(N'2025-04-10T00:00:00.0000000' AS DateTime2), CAST(N'2025-04-12T00:00:00.0000000' AS DateTime2), CAST(1000.0000 AS Decimal(18, 4)), CAST(500.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'4b7b0200-70f9-416a-9a3f-29ccab0deec4', N'347a8e25-01e0-44c0-8e84-1466150b1692', N'95e13923-0c46-475b-a1e3-0ddf9defa7e5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID], [VoucherID], [HomeStayID]) VALUES (N'ebf059e0-c0c2-4634-a9fe-3179f914f62c', CAST(N'2025-06-10T00:00:00.0000000' AS DateTime2), CAST(N'2025-06-12T00:00:00.0000000' AS DateTime2), CAST(1000.0000 AS Decimal(18, 4)), CAST(500.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'4b7b0200-70f9-416a-9a3f-29ccab0deec4', N'347a8e25-01e0-44c0-8e84-1466150b1692', N'95e13923-0c46-475b-a1e3-0ddf9defa7e5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID], [VoucherID], [HomeStayID]) VALUES (N'ef53f857-cbd7-4c36-9c3d-b30d628a93f7', CAST(N'2025-07-10T00:00:00.0000000' AS DateTime2), CAST(N'2025-07-12T00:00:00.0000000' AS DateTime2), CAST(1000.0000 AS Decimal(18, 4)), CAST(500.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'4b7b0200-70f9-416a-9a3f-29ccab0deec4', N'347a8e25-01e0-44c0-8e84-1466150b1692', N'95e13923-0c46-475b-a1e3-0ddf9defa7e5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID], [VoucherID], [HomeStayID]) VALUES (N'e029d243-2ae5-4825-a4d4-c5daf293acb4', CAST(N'2025-05-10T00:00:00.0000000' AS DateTime2), CAST(N'2025-05-12T00:00:00.0000000' AS DateTime2), CAST(1000.0000 AS Decimal(18, 4)), CAST(500.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'4b7b0200-70f9-416a-9a3f-29ccab0deec4', N'347a8e25-01e0-44c0-8e84-1466150b1692', N'95e13923-0c46-475b-a1e3-0ddf9defa7e5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID], [VoucherID], [HomeStayID]) VALUES (N'2a95c76f-e1f5-4204-b264-d40bfa6d5937', CAST(N'2025-01-10T00:00:00.0000000' AS DateTime2), CAST(N'2025-01-12T00:00:00.0000000' AS DateTime2), CAST(1000.0000 AS Decimal(18, 4)), CAST(500.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'4b7b0200-70f9-416a-9a3f-29ccab0deec4', N'347a8e25-01e0-44c0-8e84-1466150b1692', N'95e13923-0c46-475b-a1e3-0ddf9defa7e5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID], [VoucherID], [HomeStayID]) VALUES (N'ce8f9dd6-fe73-4882-bd37-de32d2d4a351', CAST(N'2025-02-10T00:00:00.0000000' AS DateTime2), CAST(N'2025-02-12T00:00:00.0000000' AS DateTime2), CAST(1000.0000 AS Decimal(18, 4)), CAST(500.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'4b7b0200-70f9-416a-9a3f-29ccab0deec4', N'347a8e25-01e0-44c0-8e84-1466150b1692', N'95e13923-0c46-475b-a1e3-0ddf9defa7e5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID], [VoucherID], [HomeStayID]) VALUES (N'cbe51039-c8c3-4a06-a7af-e880d9b91dd0', CAST(N'2025-11-10T00:00:00.0000000' AS DateTime2), CAST(N'2025-11-12T00:00:00.0000000' AS DateTime2), CAST(1000.0000 AS Decimal(18, 4)), CAST(500.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'4b7b0200-70f9-416a-9a3f-29ccab0deec4', N'347a8e25-01e0-44c0-8e84-1466150b1692', N'95e13923-0c46-475b-a1e3-0ddf9defa7e5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID], [VoucherID], [HomeStayID]) VALUES (N'c25e70fa-2b57-4f2c-a237-edde932a0ac8', CAST(N'2025-03-10T00:00:00.0000000' AS DateTime2), CAST(N'2025-03-12T00:00:00.0000000' AS DateTime2), CAST(1000.0000 AS Decimal(18, 4)), CAST(500.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'4b7b0200-70f9-416a-9a3f-29ccab0deec4', N'347a8e25-01e0-44c0-8e84-1466150b1692', N'95e13923-0c46-475b-a1e3-0ddf9defa7e5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID], [VoucherID], [HomeStayID]) VALUES (N'6c3cf30b-1a70-4ffd-b19d-f42b5a291034', CAST(N'2025-10-10T00:00:00.0000000' AS DateTime2), CAST(N'2025-10-12T00:00:00.0000000' AS DateTime2), CAST(1000.0000 AS Decimal(18, 4)), CAST(500.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'4b7b0200-70f9-416a-9a3f-29ccab0deec4', N'347a8e25-01e0-44c0-8e84-1466150b1692', N'95e13923-0c46-475b-a1e3-0ddf9defa7e5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID], [VoucherID], [HomeStayID]) VALUES (N'ae20d206-7471-42c3-b9e6-fa9de4e3e436', CAST(N'2025-12-10T00:00:00.0000000' AS DateTime2), CAST(N'2025-12-12T00:00:00.0000000' AS DateTime2), CAST(1000.0000 AS Decimal(18, 4)), CAST(500.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'4b7b0200-70f9-416a-9a3f-29ccab0deec4', N'347a8e25-01e0-44c0-8e84-1466150b1692', N'95e13923-0c46-475b-a1e3-0ddf9defa7e5')
GO
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [isDeleted]) VALUES (N'4dce9c0e-d277-4089-b010-08dd4be5e105', CAST(N'2025-02-12T00:00:00.0000000' AS DateTime2), CAST(1000000.0000 AS Decimal(18, 4)), N'95e13923-0c46-475b-a1e3-0ddf9defa7e5', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [isDeleted]) VALUES (N'4dce9c0e-d277-4089-b010-08dd4be5e121', CAST(N'2025-02-20T00:00:00.0000000' AS DateTime2), CAST(50000000.0000 AS Decimal(18, 4)), N'95e13923-0c46-475b-a1e3-0ddf9defa7e5', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [isDeleted]) VALUES (N'f6c8c573-7fb4-4f0b-a5ba-08dd4bf1f3c0', CAST(N'2025-02-12T00:00:00.0000000' AS DateTime2), CAST(1500000.0000 AS Decimal(18, 4)), N'baa29629-f705-4dcb-adb6-7fc734954af3', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [isDeleted]) VALUES (N'94b96009-acc6-47ff-a01f-08dd4c0590eb', CAST(N'2025-02-15T00:00:00.0000000' AS DateTime2), CAST(3000000.0000 AS Decimal(18, 4)), N'10629e0d-0c03-4fa9-ae18-2c6a79ddf94b', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [isDeleted]) VALUES (N'94b96009-acc6-47ff-a01f-08dd4c0590ed', CAST(N'2025-02-12T00:00:00.0000000' AS DateTime2), CAST(2000000.0000 AS Decimal(18, 4)), N'10629e0d-0c03-4fa9-ae18-2c6a79ddf94b', 0)
GO
INSERT [dbo].[EmailConfirmationTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'dc057c6e-1dcf-48a6-9e85-f1fddca7a0ef', N'42bff998-c4eb-4bdb-a047-f6ecd3e15046', N'538278', CAST(N'2025-02-13T11:24:55.1495761' AS DateTime2))
GO
INSERT [dbo].[HomeStay] ([Id], [MainImage], [Name], [OpenIn], [Description], [Standar], [isDeleted], [Address], [City], [isBooked], [CheckInTime], [CheckOutTime], [UserID]) VALUES (N'95e13923-0c46-475b-a1e3-0ddf9defa7e5', N'https://localhost:7194/swagger/index.html', N'Sunrise Homestay', 2022, N'A beautiful homestay with ocean view.', 4, 0, N'123 Beach Road', N'Da Nang', 0, N'14:00', N'12:00', N'42bff998-c4eb-4bdb-a047-f6ecd3e15046')
INSERT [dbo].[HomeStay] ([Id], [MainImage], [Name], [OpenIn], [Description], [Standar], [isDeleted], [Address], [City], [isBooked], [CheckInTime], [CheckOutTime], [UserID]) VALUES (N'10629e0d-0c03-4fa9-ae18-2c6a79ddf94b', N'https://localhost:7194/swagger/index.html', N'Sunrise Homestay', 2022, N'A beautiful homestay with ocean view.', 4, 0, N'123 Beach Road', N'HCM', 0, N'14:00', N'12:00', N'42bff998-c4eb-4bdb-a047-f6ecd3e15046')
INSERT [dbo].[HomeStay] ([Id], [MainImage], [Name], [OpenIn], [Description], [Standar], [isDeleted], [Address], [City], [isBooked], [CheckInTime], [CheckOutTime], [UserID]) VALUES (N'baa29629-f705-4dcb-adb6-7fc734954af3', N'https://localhost:7194/swagger/index.html', N'Sunrise Homestay', 2022, N'A beautiful homestay with ocean view.', 4, 0, N'123 Beach Road', N'HCM', 0, N'14:00', N'12:00', N'42bff998-c4eb-4bdb-a047-f6ecd3e15046')
GO
INSERT [dbo].[HomestayAmenity] ([AmenityId], [HomeStayID], [isDeleted]) VALUES (N'89c51fb0-c306-4f8b-b5b7-0c24ca2e6241', N'95e13923-0c46-475b-a1e3-0ddf9defa7e5', 0)
INSERT [dbo].[HomestayAmenity] ([AmenityId], [HomeStayID], [isDeleted]) VALUES (N'4fa1544c-5f4d-45bb-a53d-75c402456715', N'95e13923-0c46-475b-a1e3-0ddf9defa7e5', 0)
INSERT [dbo].[HomestayAmenity] ([AmenityId], [HomeStayID], [isDeleted]) VALUES (N'f1b218c9-17f0-43c4-b8db-f69c73440f5e', N'10629e0d-0c03-4fa9-ae18-2c6a79ddf94b', 0)
GO
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'a0addf06-ea82-45a1-a5f9-91416ce5849a', N'https://example.com/image3.jpg', N'95e13923-0c46-475b-a1e3-0ddf9defa7e5', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'933f2d54-c52e-4655-86c2-af476f01ce35', N'https://example.com/image3.jpg', N'10629e0d-0c03-4fa9-ae18-2c6a79ddf94b', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'cf853b5b-9ede-4eca-9c30-c11c28682953', N'https://example.com/image2.jpg', N'baa29629-f705-4dcb-adb6-7fc734954af3', 0)
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 

INSERT [dbo].[Roles] ([Id], [Name]) VALUES (1, N'Admin')
INSERT [dbo].[Roles] ([Id], [Name]) VALUES (2, N'Manager')
INSERT [dbo].[Roles] ([Id], [Name]) VALUES (3, N'User')
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO
INSERT [dbo].[Users] ([Id], [FullName], [Email], [Phone], [Address], [BirhDay], [Gender], [Avatar], [CitizenID], [PasswordHash], [IsEmailConfirmed], [IsDeleted], [RoleId], [CreatedAt], [LastModifiedAt]) VALUES (N'4b7b0200-70f9-416a-9a3f-29ccab0deec4', N'staff', N'staff@gmail.com', N'0987654123', N'Bình Thủy, Cần Thơ', NULL, NULL, NULL, NULL, N'$2a$11$BR7LgTCctqzomAfFkifbE.5YLIDc/ms/vp.66SjWGQRodmNxsb/um', 1, 0, 2, CAST(N'2025-02-13T14:34:30.9065220' AS DateTime2), CAST(N'2025-02-13T14:34:30.9065232' AS DateTime2))
INSERT [dbo].[Users] ([Id], [FullName], [Email], [Phone], [Address], [BirhDay], [Gender], [Avatar], [CitizenID], [PasswordHash], [IsEmailConfirmed], [IsDeleted], [RoleId], [CreatedAt], [LastModifiedAt]) VALUES (N'd87b4b72-609b-4979-b758-7771481da883', N'admin', N'admin@gmail.com', N'0987654321', N'Ninh Kiều, Cần Thơ', NULL, NULL, NULL, NULL, N'$2a$11$t/8MMEUeZo8BB2nXzame6.80fPkszHeMTaDXCp2lK.rAtB5P4w4ce', 1, 0, 1, CAST(N'2025-02-13T14:34:30.7872154' AS DateTime2), CAST(N'2025-02-13T14:34:30.7872162' AS DateTime2))
INSERT [dbo].[Users] ([Id], [FullName], [Email], [Phone], [Address], [BirhDay], [Gender], [Avatar], [CitizenID], [PasswordHash], [IsEmailConfirmed], [IsDeleted], [RoleId], [CreatedAt], [LastModifiedAt]) VALUES (N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'user', N'user@gmail.com', N'0987654312', N'Phong Điền, Cần Thơ', NULL, NULL, NULL, NULL, N'$2a$11$m8ZnniUKw7GmaDHROMMjwOWp/fQODRJlipQ/mHWj0moH2R2cQB2oe', 1, 0, 3, CAST(N'2025-02-13T14:34:31.0233173' AS DateTime2), CAST(N'2025-02-13T14:34:31.0233184' AS DateTime2))
INSERT [dbo].[Users] ([Id], [FullName], [Email], [Phone], [Address], [BirhDay], [Gender], [Avatar], [CitizenID], [PasswordHash], [IsEmailConfirmed], [IsDeleted], [RoleId], [CreatedAt], [LastModifiedAt]) VALUES (N'42bff998-c4eb-4bdb-a047-f6ecd3e15046', N'Trần Quốc Bảo', N'khanglam707@gmail.com', N'0386040060', N'Cần Thơ', NULL, NULL, NULL, NULL, N'$2a$11$kuBG4USGiFTIsjupHnruQekpOaW.RHJI54jrXXBlAu2fxjTRnyg5u', 1, 0, 1, CAST(N'2025-02-13T11:19:54.9604705' AS DateTime2), CAST(N'2025-02-13T11:19:54.9604718' AS DateTime2))
GO
INSERT [dbo].[UserVoucher] ([UserID], [VoucherID], [isUsed]) VALUES (N'42bff998-c4eb-4bdb-a047-f6ecd3e15046', N'347a8e25-01e0-44c0-8e84-1466150b1692', 0)
GO
INSERT [dbo].[Voucher] ([Id], [Image], [Code], [Discount], [Description], [QuantityUsed], [StartDate], [EndDate], [isDeleted]) VALUES (N'347a8e25-01e0-44c0-8e84-1466150b1692', N'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg', N'abcdsx', 10, N'10', 10, CAST(N'2025-02-13T00:00:00.0000000' AS DateTime2), CAST(N'2025-02-28T00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Voucher] ([Id], [Image], [Code], [Discount], [Description], [QuantityUsed], [StartDate], [EndDate], [isDeleted]) VALUES (N'661d6104-01f8-4cea-85ad-26a11007465b', N'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA', N'QvgcWq', 50, N'Giảm giá 50% cho đơn hàng trên 500.000 VND.', 10, CAST(N'2025-02-13T00:00:00.0000000' AS DateTime2), CAST(N'2025-02-20T23:59:59.0000000' AS DateTime2), 0)
INSERT [dbo].[Voucher] ([Id], [Image], [Code], [Discount], [Description], [QuantityUsed], [StartDate], [EndDate], [isDeleted]) VALUES (N'c8bd6e4a-4222-461f-a42c-297d1034879a', N'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA', N'HMzMVP', 50, N'Giảm giá 50% cho đơn hàng trên 500.000 VND.', 10, CAST(N'2025-02-13T00:00:00.0000000' AS DateTime2), CAST(N'2025-02-20T23:59:59.0000000' AS DateTime2), 0)
INSERT [dbo].[Voucher] ([Id], [Image], [Code], [Discount], [Description], [QuantityUsed], [StartDate], [EndDate], [isDeleted]) VALUES (N'ffaf6d0b-108a-41a0-8ad1-5357aa3aded5', N'string', N'bwBgWN', 0, N'string', 0, CAST(N'2025-02-13T12:43:10.5470000' AS DateTime2), CAST(N'2025-02-13T12:43:10.5470000' AS DateTime2), 0)
INSERT [dbo].[Voucher] ([Id], [Image], [Code], [Discount], [Description], [QuantityUsed], [StartDate], [EndDate], [isDeleted]) VALUES (N'48c85729-606e-4a46-b6b2-81cdad1d5f94', N'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA', N'yFfOqn', 50, N'Giảm giá 50% cho đơn hàng trên 500.000 VND.', 10, CAST(N'2025-02-13T00:00:00.0000000' AS DateTime2), CAST(N'2025-02-20T23:59:59.0000000' AS DateTime2), 0)
INSERT [dbo].[Voucher] ([Id], [Image], [Code], [Discount], [Description], [QuantityUsed], [StartDate], [EndDate], [isDeleted]) VALUES (N'af84f665-f39d-42c4-b57c-a8aad7ce3f73', N'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA', N'eXUfxH', 50, N'Giảm giá 50% cho đơn hàng trên 500.000 VND.', 10, CAST(N'2025-02-13T00:00:00.0000000' AS DateTime2), CAST(N'2025-02-20T23:59:59.0000000' AS DateTime2), 0)
INSERT [dbo].[Voucher] ([Id], [Image], [Code], [Discount], [Description], [QuantityUsed], [StartDate], [EndDate], [isDeleted]) VALUES (N'cf210b8f-88ba-499c-8a8d-d75dff88e387', N'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...', N'QpwAaa', 50, N'Giảm giá 50% cho đơn hàng trên 500.000 VND.', 10, CAST(N'2025-02-13T00:00:00.0000000' AS DateTime2), CAST(N'2025-02-20T23:59:59.0000000' AS DateTime2), 0)
GO
ALTER TABLE [dbo].[Booking]  WITH CHECK ADD  CONSTRAINT [FK_Booking_HomeStay_HomeStayID] FOREIGN KEY([HomeStayID])
REFERENCES [dbo].[HomeStay] ([Id])
GO
ALTER TABLE [dbo].[Booking] CHECK CONSTRAINT [FK_Booking_HomeStay_HomeStayID]
GO
ALTER TABLE [dbo].[Booking]  WITH CHECK ADD  CONSTRAINT [FK_Booking_Users_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Booking] CHECK CONSTRAINT [FK_Booking_Users_UserID]
GO
ALTER TABLE [dbo].[Booking]  WITH CHECK ADD  CONSTRAINT [FK_Booking_Voucher_VoucherID] FOREIGN KEY([VoucherID])
REFERENCES [dbo].[Voucher] ([Id])
GO
ALTER TABLE [dbo].[Booking] CHECK CONSTRAINT [FK_Booking_Voucher_VoucherID]
GO
ALTER TABLE [dbo].[Calendar]  WITH CHECK ADD  CONSTRAINT [FK_Calendar_HomeStay_HomeStayID] FOREIGN KEY([HomeStayID])
REFERENCES [dbo].[HomeStay] ([Id])
GO
ALTER TABLE [dbo].[Calendar] CHECK CONSTRAINT [FK_Calendar_HomeStay_HomeStayID]
GO
ALTER TABLE [dbo].[CommentPost]  WITH CHECK ADD  CONSTRAINT [FK_CommentPost_Post_PostID] FOREIGN KEY([PostID])
REFERENCES [dbo].[Post] ([Id])
GO
ALTER TABLE [dbo].[CommentPost] CHECK CONSTRAINT [FK_CommentPost_Post_PostID]
GO
ALTER TABLE [dbo].[CommentPost]  WITH CHECK ADD  CONSTRAINT [FK_CommentPost_Users_ParrentID] FOREIGN KEY([ParrentID])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[CommentPost] CHECK CONSTRAINT [FK_CommentPost_Users_ParrentID]
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
