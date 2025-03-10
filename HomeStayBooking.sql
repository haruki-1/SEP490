USE [HomeStayBooking]
GO
/****** Object:  Table [dbo].[Amenity]    Script Date: 2/17/2025 5:46:24 PM ******/
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
/****** Object:  Table [dbo].[Booking]    Script Date: 2/17/2025 5:46:24 PM ******/
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
 CONSTRAINT [PK_Booking] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Calendar]    Script Date: 2/17/2025 5:46:24 PM ******/
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
 CONSTRAINT [PK_Calendar] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CommentPost]    Script Date: 2/17/2025 5:46:24 PM ******/
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
/****** Object:  Table [dbo].[EmailConfirmationTokens]    Script Date: 2/17/2025 5:46:24 PM ******/
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
/****** Object:  Table [dbo].[Facility]    Script Date: 2/17/2025 5:46:24 PM ******/
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
 CONSTRAINT [PK_Facility] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FeedBack]    Script Date: 2/17/2025 5:46:24 PM ******/
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
/****** Object:  Table [dbo].[HomeStay]    Script Date: 2/17/2025 5:46:24 PM ******/
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
/****** Object:  Table [dbo].[HomestayAmenity]    Script Date: 2/17/2025 5:46:24 PM ******/
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
/****** Object:  Table [dbo].[HomeStayFacility]    Script Date: 2/17/2025 5:46:24 PM ******/
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
/****** Object:  Table [dbo].[HomeStayImage]    Script Date: 2/17/2025 5:46:24 PM ******/
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
/****** Object:  Table [dbo].[Post]    Script Date: 2/17/2025 5:46:24 PM ******/
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
/****** Object:  Table [dbo].[PostImage]    Script Date: 2/17/2025 5:46:24 PM ******/
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
/****** Object:  Table [dbo].[RefreshTokens]    Script Date: 2/17/2025 5:46:24 PM ******/
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
/****** Object:  Table [dbo].[Roles]    Script Date: 2/17/2025 5:46:24 PM ******/
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
/****** Object:  Table [dbo].[Users]    Script Date: 2/17/2025 5:46:24 PM ******/
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
/****** Object:  Table [dbo].[UserVoucher]    Script Date: 2/17/2025 5:46:24 PM ******/
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
/****** Object:  Table [dbo].[Voucher]    Script Date: 2/17/2025 5:46:24 PM ******/
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
INSERT [dbo].[Amenity] ([Id], [Name], [isDeleted]) VALUES (N'61ec2c56-0e32-4fbc-8bf7-0572da5fdffd', N'Free Wifi', 0)
INSERT [dbo].[Amenity] ([Id], [Name], [isDeleted]) VALUES (N'22c0f1f9-9083-4ce0-bc44-c3051cb19f78', N'Swimming Pool', 0)
INSERT [dbo].[Amenity] ([Id], [Name], [isDeleted]) VALUES (N'a5b300ed-8b1f-4fe8-be6b-c48ad7cd5ecd', N'Air Conditioning', 0)
INSERT [dbo].[Amenity] ([Id], [Name], [isDeleted]) VALUES (N'f7d504e8-cf39-4f9e-bdfc-fb438b9f4d34', N'Breakfast Included', 0)
GO
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'5d7032be-155b-49e6-a4c0-11695f3f3151', CAST(N'2024-09-27T00:00:00.0000000' AS DateTime2), CAST(N'2024-09-29T00:00:00.0000000' AS DateTime2), CAST(450.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'5be0ff35-8cf8-448b-8123-1b5e911880ab', CAST(N'2024-12-07T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-09T00:00:00.0000000' AS DateTime2), CAST(340.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'b89028bb-181f-4b9e-ae72-1c69fbcd19b0', CAST(N'2024-10-08T00:00:00.0000000' AS DateTime2), CAST(N'2024-10-10T00:00:00.0000000' AS DateTime2), CAST(310.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'd2a73699-9b7d-42a5-bd00-214751e58f19', CAST(N'2024-01-15T00:00:00.0000000' AS DateTime2), CAST(N'2024-01-17T00:00:00.0000000' AS DateTime2), CAST(300.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'ea28d6f5-b2a1-49b0-92cd-36079fd9a9cb', CAST(N'2024-03-08T00:00:00.0000000' AS DateTime2), CAST(N'2024-03-10T00:00:00.0000000' AS DateTime2), CAST(180.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'18855955-4f90-4f22-8a10-3a5a8b905021', CAST(N'2024-04-25T00:00:00.0000000' AS DateTime2), CAST(N'2024-04-27T00:00:00.0000000' AS DateTime2), CAST(500.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'76acc7df-0cc6-4a75-8d95-5679057b6732', CAST(N'2024-03-22T00:00:00.0000000' AS DateTime2), CAST(N'2024-03-24T00:00:00.0000000' AS DateTime2), CAST(350.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'293954e5-7714-4d4f-8488-5b99b38ab32f', CAST(N'2024-05-18T00:00:00.0000000' AS DateTime2), CAST(N'2024-05-20T00:00:00.0000000' AS DateTime2), CAST(320.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'996873e7-1801-4659-9ff6-5e5c59cfe11a', CAST(N'2024-11-11T00:00:00.0000000' AS DateTime2), CAST(N'2024-11-13T00:00:00.0000000' AS DateTime2), CAST(270.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'763e8dff-7c6e-4f88-b489-5f2dec48a485', CAST(N'2024-02-05T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-07T00:00:00.0000000' AS DateTime2), CAST(250.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'3a1a43e0-b09a-45c4-857f-711d6bd09c39', CAST(N'2024-07-29T00:00:00.0000000' AS DateTime2), CAST(N'2024-07-31T00:00:00.0000000' AS DateTime2), CAST(370.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'1bd52e82-e746-4324-8960-71b8f9f89210', CAST(N'2024-04-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-04-14T00:00:00.0000000' AS DateTime2), CAST(220.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'2650ad7c-b047-4157-90f2-778f24209b64', CAST(N'2024-11-20T00:00:00.0000000' AS DateTime2), CAST(N'2024-11-22T00:00:00.0000000' AS DateTime2), CAST(390.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'38c82f7f-0996-45d8-b1de-8e48d5594440', CAST(N'2024-02-20T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-22T00:00:00.0000000' AS DateTime2), CAST(400.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'261196fb-9072-42d9-b41c-b7c3a06e4e54', CAST(N'2024-08-18T00:00:00.0000000' AS DateTime2), CAST(N'2024-08-20T00:00:00.0000000' AS DateTime2), CAST(410.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'8e7c6830-cc4d-4be6-927a-bdc3ff9db21e', CAST(N'2024-08-05T00:00:00.0000000' AS DateTime2), CAST(N'2024-08-07T00:00:00.0000000' AS DateTime2), CAST(330.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'5fd57f61-7335-4892-8e12-c2b5bc58c11a', CAST(N'2024-10-24T00:00:00.0000000' AS DateTime2), CAST(N'2024-10-26T00:00:00.0000000' AS DateTime2), CAST(480.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'92597d2d-a954-43f9-83da-c545a8bea716', CAST(N'2024-01-10T00:00:00.0000000' AS DateTime2), CAST(N'2024-01-12T00:00:00.0000000' AS DateTime2), CAST(200.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'fa9dafcc-d8b2-4e00-85fb-cd16f6cabc66', CAST(N'2024-05-09T00:00:00.0000000' AS DateTime2), CAST(N'2024-05-11T00:00:00.0000000' AS DateTime2), CAST(280.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'028ddcf6-b5e0-49a2-9df0-cfb565230eaf', CAST(N'2024-06-22T00:00:00.0000000' AS DateTime2), CAST(N'2024-06-24T00:00:00.0000000' AS DateTime2), CAST(420.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'de20cf2d-7b03-48fe-9dda-dc76f8bfcb68', CAST(N'2024-07-14T00:00:00.0000000' AS DateTime2), CAST(N'2024-07-16T00:00:00.0000000' AS DateTime2), CAST(210.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'25af537a-66d6-45c9-9164-e66c11a248e5', CAST(N'2024-09-10T00:00:00.0000000' AS DateTime2), CAST(N'2024-09-12T00:00:00.0000000' AS DateTime2), CAST(290.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'97be560e-a520-4b85-9488-f444455ecdbd', CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), CAST(520.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[Booking] ([Id], [CheckInDate], [CheckOutDate], [TotalPrice], [UnitPrice], [Status], [ReasonCancel], [isDeleted], [UserID]) VALUES (N'15792e04-0ef9-48dc-86a1-fbbb801ca613', CAST(N'2024-06-07T00:00:00.0000000' AS DateTime2), CAST(N'2024-06-09T00:00:00.0000000' AS DateTime2), CAST(260.0000 AS Decimal(18, 4)), CAST(1000000.0000 AS Decimal(18, 4)), N'Payment Completed', NULL, 0, N'71061322-f826-4a01-b130-a2c2895d08f5')
GO
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'52348f0a-536e-4ce6-8776-0c6dfdf37482', CAST(N'2024-01-10T00:00:00.0000000' AS DateTime2), CAST(100.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'92597d2d-a954-43f9-83da-c545a8bea716', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'e2f3eab0-9273-40b7-afe8-1865105f9976', CAST(N'2024-01-11T00:00:00.0000000' AS DateTime2), CAST(100.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'92597d2d-a954-43f9-83da-c545a8bea716', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'e76aeabe-a459-4b30-9dea-23af2a53d6c1', CAST(N'2024-06-07T00:00:00.0000000' AS DateTime2), CAST(130.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'15792e04-0ef9-48dc-86a1-fbbb801ca613', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'f088aaa5-6f2f-4879-b123-2d2043079b28', CAST(N'2024-08-05T00:00:00.0000000' AS DateTime2), CAST(165.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'8e7c6830-cc4d-4be6-927a-bdc3ff9db21e', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'01cb7cb2-3c79-4563-9525-3038bcf14b05', CAST(N'2024-08-18T00:00:00.0000000' AS DateTime2), CAST(205.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'261196fb-9072-42d9-b41c-b7c3a06e4e54', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'22895726-7ee6-411a-9444-343fdb1cf1b4', CAST(N'2024-05-19T00:00:00.0000000' AS DateTime2), CAST(160.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'293954e5-7714-4d4f-8488-5b99b38ab32f', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'5ab459ed-70bc-49ce-b37b-360fbef87dad', CAST(N'2024-08-19T00:00:00.0000000' AS DateTime2), CAST(205.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'261196fb-9072-42d9-b41c-b7c3a06e4e54', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'5523df07-1baa-4bcd-a87b-3f6858e3185c', CAST(N'2024-06-22T00:00:00.0000000' AS DateTime2), CAST(210.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'028ddcf6-b5e0-49a2-9df0-cfb565230eaf', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'c55f51dd-2b7c-4400-93d4-443aebbb8de1', CAST(N'2024-10-09T00:00:00.0000000' AS DateTime2), CAST(155.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'b89028bb-181f-4b9e-ae72-1c69fbcd19b0', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'97e2f15b-9f6e-4f6a-8c70-46d0882f4bc2', CAST(N'2024-01-16T00:00:00.0000000' AS DateTime2), CAST(150.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'd2a73699-9b7d-42a5-bd00-214751e58f19', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'f36b55e7-977c-42d1-8b74-49264b12774f', CAST(N'2024-11-11T00:00:00.0000000' AS DateTime2), CAST(135.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'996873e7-1801-4659-9ff6-5e5c59cfe11a', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'9656d1f0-dae5-4867-be3f-54d4393b71f4', CAST(N'2024-03-08T00:00:00.0000000' AS DateTime2), CAST(90.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'ea28d6f5-b2a1-49b0-92cd-36079fd9a9cb', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'9401140e-95fa-4272-8e2a-5584b24b820b', CAST(N'2024-05-09T00:00:00.0000000' AS DateTime2), CAST(140.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'fa9dafcc-d8b2-4e00-85fb-cd16f6cabc66', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'8b056f70-2683-4151-a7c0-6724dc7bd885', CAST(N'2024-06-23T00:00:00.0000000' AS DateTime2), CAST(210.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'028ddcf6-b5e0-49a2-9df0-cfb565230eaf', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'c3156100-b797-4fb4-8f54-77e09a8e3f70', CAST(N'2024-05-18T00:00:00.0000000' AS DateTime2), CAST(160.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'293954e5-7714-4d4f-8488-5b99b38ab32f', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'c49825e6-a0e3-4393-a171-792f512782bd', CAST(N'2024-07-15T00:00:00.0000000' AS DateTime2), CAST(105.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'de20cf2d-7b03-48fe-9dda-dc76f8bfcb68', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'13612e26-ff8a-4351-9a65-797fb035845a', CAST(N'2024-11-21T00:00:00.0000000' AS DateTime2), CAST(195.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'2650ad7c-b047-4157-90f2-778f24209b64', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'9b13d54e-6f46-435e-a725-7caf13ed9533', CAST(N'2024-07-14T00:00:00.0000000' AS DateTime2), CAST(105.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'de20cf2d-7b03-48fe-9dda-dc76f8bfcb68', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'1ad7b2b9-d74a-4afb-ade5-7f6ca24ff674', CAST(N'2024-02-05T00:00:00.0000000' AS DateTime2), CAST(125.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'763e8dff-7c6e-4f88-b489-5f2dec48a485', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'a5b7f0ec-e735-4f74-8f55-8508140e5051', CAST(N'2024-11-20T00:00:00.0000000' AS DateTime2), CAST(195.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'2650ad7c-b047-4157-90f2-778f24209b64', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'298ae2e9-770e-4cce-99d3-8ca0a5cc71cf', CAST(N'2024-11-12T00:00:00.0000000' AS DateTime2), CAST(135.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'996873e7-1801-4659-9ff6-5e5c59cfe11a', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'88e2a52e-ed05-4ff5-b103-9573f392713f', CAST(N'2024-12-07T00:00:00.0000000' AS DateTime2), CAST(170.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'5be0ff35-8cf8-448b-8123-1b5e911880ab', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'acf7fe55-4d5d-447e-a48a-9896466755d3', CAST(N'2024-09-28T00:00:00.0000000' AS DateTime2), CAST(225.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'5d7032be-155b-49e6-a4c0-11695f3f3151', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'3dca80a6-3dec-440b-b9b3-9abe9156061a', CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), CAST(260.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'97be560e-a520-4b85-9488-f444455ecdbd', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'1a6d5f2d-cc00-4735-b646-9b4f19682beb', CAST(N'2024-10-24T00:00:00.0000000' AS DateTime2), CAST(240.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'5fd57f61-7335-4892-8e12-c2b5bc58c11a', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'bc92b75f-48b8-49f9-acfa-9be3c82708f8', CAST(N'2024-02-20T00:00:00.0000000' AS DateTime2), CAST(200.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'38c82f7f-0996-45d8-b1de-8e48d5594440', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'1e2a47d7-fb0a-410b-9a17-a0ded93271a7', CAST(N'2024-08-06T00:00:00.0000000' AS DateTime2), CAST(165.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'8e7c6830-cc4d-4be6-927a-bdc3ff9db21e', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'dc778140-7dd3-4cc0-be42-af97449b2502', CAST(N'2024-03-23T00:00:00.0000000' AS DateTime2), CAST(175.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'76acc7df-0cc6-4a75-8d95-5679057b6732', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'e347b3bc-746b-478b-b1aa-b1fc7eddb993', CAST(N'2024-09-10T00:00:00.0000000' AS DateTime2), CAST(145.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'25af537a-66d6-45c9-9164-e66c11a248e5', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'352f7250-66af-4ca7-9482-bb2586adf3f9', CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), CAST(260.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'97be560e-a520-4b85-9488-f444455ecdbd', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'6fd95fa8-f740-490a-9a7f-c6c886590230', CAST(N'2024-12-08T00:00:00.0000000' AS DateTime2), CAST(170.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'5be0ff35-8cf8-448b-8123-1b5e911880ab', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'a7e67391-7d45-40cf-81b3-c7282d74c067', CAST(N'2024-01-15T00:00:00.0000000' AS DateTime2), CAST(150.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'd2a73699-9b7d-42a5-bd00-214751e58f19', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'd19457ac-7d84-4936-a49c-cb2b70dc12f1', CAST(N'2024-09-27T00:00:00.0000000' AS DateTime2), CAST(225.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'5d7032be-155b-49e6-a4c0-11695f3f3151', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'81b19acf-0f5e-4a11-82fc-cd1156c87feb', CAST(N'2024-10-08T00:00:00.0000000' AS DateTime2), CAST(155.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'b89028bb-181f-4b9e-ae72-1c69fbcd19b0', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'c6469eb9-073d-4241-a321-cd8a9e3f484f', CAST(N'2024-09-11T00:00:00.0000000' AS DateTime2), CAST(145.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'25af537a-66d6-45c9-9164-e66c11a248e5', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'577a8240-c524-45ba-b1ae-ce8e126dcd82', CAST(N'2024-10-25T00:00:00.0000000' AS DateTime2), CAST(240.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'5fd57f61-7335-4892-8e12-c2b5bc58c11a', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'9262a159-b486-4f4a-a2ff-d1629c774604', CAST(N'2024-06-08T00:00:00.0000000' AS DateTime2), CAST(130.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'15792e04-0ef9-48dc-86a1-fbbb801ca613', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'5b6d8f1d-44e8-48c1-910a-d287ba4f702d', CAST(N'2024-03-22T00:00:00.0000000' AS DateTime2), CAST(175.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'76acc7df-0cc6-4a75-8d95-5679057b6732', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'2040a73d-7bb7-44a7-b5c6-d3db4f23f32e', CAST(N'2024-02-06T00:00:00.0000000' AS DateTime2), CAST(125.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'763e8dff-7c6e-4f88-b489-5f2dec48a485', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'5b931d0c-55e6-4b11-a5f5-d4cc8278efa1', CAST(N'2024-05-10T00:00:00.0000000' AS DateTime2), CAST(140.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'fa9dafcc-d8b2-4e00-85fb-cd16f6cabc66', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'10d9ce18-3750-4b11-847a-d500796855df', CAST(N'2024-04-13T00:00:00.0000000' AS DateTime2), CAST(110.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'1bd52e82-e746-4324-8960-71b8f9f89210', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'8d31e05a-1481-4b34-9507-dd492cfe4407', CAST(N'2024-02-21T00:00:00.0000000' AS DateTime2), CAST(200.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'38c82f7f-0996-45d8-b1de-8e48d5594440', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'dbcc6703-8485-4266-a410-e76489a8ed97', CAST(N'2024-07-29T00:00:00.0000000' AS DateTime2), CAST(185.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'3a1a43e0-b09a-45c4-857f-711d6bd09c39', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'cb129969-fb68-4b59-bdd4-e869584cc86b', CAST(N'2024-04-25T00:00:00.0000000' AS DateTime2), CAST(250.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'18855955-4f90-4f22-8a10-3a5a8b905021', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'215c144c-25a7-4334-9420-f19630bf1877', CAST(N'2024-07-30T00:00:00.0000000' AS DateTime2), CAST(185.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'3a1a43e0-b09a-45c4-857f-711d6bd09c39', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'8c6c2a18-d7b1-4b85-b1ff-f4e27ca833ce', CAST(N'2024-04-26T00:00:00.0000000' AS DateTime2), CAST(250.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'18855955-4f90-4f22-8a10-3a5a8b905021', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'80c0b20b-ae30-452a-9e17-fd8ba85cdb30', CAST(N'2024-04-12T00:00:00.0000000' AS DateTime2), CAST(110.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'1bd52e82-e746-4324-8960-71b8f9f89210', 0)
INSERT [dbo].[Calendar] ([Id], [Date], [Price], [HomeStayID], [BookingID], [isDeleted]) VALUES (N'df1b95bb-44aa-4d7a-afce-ff9576fcda96', CAST(N'2024-03-09T00:00:00.0000000' AS DateTime2), CAST(90.0000 AS Decimal(18, 4)), N'b35ec1cd-1c94-46b7-84b1-161302147266', N'ea28d6f5-b2a1-49b0-92cd-36079fd9a9cb', 0)
GO
INSERT [dbo].[EmailConfirmationTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'df376661-a853-42d6-a88c-0194f9528135', N'71061322-f826-4a01-b130-a2c2895d08f5', N'157489', CAST(N'2025-02-15T21:08:02.3728866' AS DateTime2))
GO
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'a4ce8371-4309-428b-5668-08dd4f35ea9f', N'Heater', N'Heater to keep the house warm during the winter season.', CAST(N'2025-02-17T16:31:54.5438271' AS DateTime2), CAST(N'2025-02-17T16:31:54.5438253' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'3324e6f4-9145-4090-5669-08dd4f35ea9f', N'Refrigerator', N'Refrigerator to store food and beverages for guests.', CAST(N'2025-02-17T16:31:54.5448681' AS DateTime2), CAST(N'2025-02-17T16:31:54.5448676' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'4e982d2e-1a08-4474-566a-08dd4f35ea9f', N'Stove', N'Gas or electric stove for guests to cook.', CAST(N'2025-02-17T16:31:54.5458653' AS DateTime2), CAST(N'2025-02-17T16:31:54.5458645' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'1bc440bc-1b01-44d0-566b-08dd4f35ea9f', N'Microwave', N'Microwave to heat up food.', CAST(N'2025-02-17T16:31:54.5465306' AS DateTime2), CAST(N'2025-02-17T16:31:54.5465302' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'afda4822-b432-4d9d-566c-08dd4f35ea9f', N'Coffee Maker', N'Coffee maker or kettle for guests to make coffee or tea.', CAST(N'2025-02-17T16:31:54.5474914' AS DateTime2), CAST(N'2025-02-17T16:31:54.5474911' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'347d5947-6aa7-4421-566d-08dd4f35ea9f', N'Cooking Utensils', N'Pans, pots, knives, cutting boards, spoons, forks, etc.', CAST(N'2025-02-17T16:31:54.5480985' AS DateTime2), CAST(N'2025-02-17T16:31:54.5480982' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'd862cf09-edc3-4d25-566e-08dd4f35ea9f', N'Dishware', N'Plates, bowls, cups, spoons, and forks for meals.', CAST(N'2025-02-17T16:31:54.5488779' AS DateTime2), CAST(N'2025-02-17T16:31:54.5488776' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'f65514f3-a26e-4a69-566f-08dd4f35ea9f', N'Bed', N'A comfortable bed large enough for all guests.', CAST(N'2025-02-17T16:31:54.5496202' AS DateTime2), CAST(N'2025-02-17T16:31:54.5496199' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'e675fac0-0e67-47e7-5670-08dd4f35ea9f', N'Hair Dryer', N'Hair dryer for guests to use after showering.', CAST(N'2025-02-17T16:31:54.5502267' AS DateTime2), CAST(N'2025-02-17T16:31:54.5502264' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'a08974ed-c785-41aa-5671-08dd4f35ea9f', N'Towels', N'Towels and face towels for guest use.', CAST(N'2025-02-17T16:31:54.5507066' AS DateTime2), CAST(N'2025-02-17T16:31:54.5507062' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'9981db5d-ba4b-40e4-5672-08dd4f35ea9f', N'Table and Chairs', N'Table and chairs for eating, working, or relaxing.', CAST(N'2025-02-17T16:31:54.5511925' AS DateTime2), CAST(N'2025-02-17T16:31:54.5511922' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'c1d1ea98-4a3b-4aa5-5673-08dd4f35ea9f', N'Clothes Hanger', N'Clothes hanger or hooks in the bedroom and bathroom.', CAST(N'2025-02-17T16:31:54.5516623' AS DateTime2), CAST(N'2025-02-17T16:31:54.5516620' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'e1d7aca0-8f62-47c1-5674-08dd4f35ea9f', N'TV', N'Television for guest entertainment.', CAST(N'2025-02-17T16:31:54.5521529' AS DateTime2), CAST(N'2025-02-17T16:31:54.5521526' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'8f913be1-3c9c-4c18-5675-08dd4f35ea9f', N'Bathtub', N'Bathtub (if available) for guests to relax.', CAST(N'2025-02-17T16:31:54.5527170' AS DateTime2), CAST(N'2025-02-17T16:31:54.5527167' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'f1607327-055e-456d-5676-08dd4f35ea9f', N'Washing Machine', N'Washing machine for guests to do their laundry during the stay.', CAST(N'2025-02-17T16:31:54.5531720' AS DateTime2), CAST(N'2025-02-17T16:31:54.5531717' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'd372f742-7580-47c5-5677-08dd4f35ea9f', N'Air Conditioning', N'Air conditioner for cooling the living space.', CAST(N'2025-02-17T16:31:54.5537093' AS DateTime2), CAST(N'2025-02-17T16:31:54.5537090' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'146ea622-e9ca-40a3-5678-08dd4f35ea9f', N'Water Heater', N'Water heater for hot water use in the shower.', CAST(N'2025-02-17T16:31:54.5542236' AS DateTime2), CAST(N'2025-02-17T16:31:54.5542233' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'18913dae-11cb-4361-5679-08dd4f35ea9f', N'Remote Control', N'Remote control for the TV, air conditioner, or other devices.', CAST(N'2025-02-17T16:31:54.5549053' AS DateTime2), CAST(N'2025-02-17T16:31:54.5549050' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'77d33dda-59f2-4c26-567a-08dd4f35ea9f', N'Desk', N'Desk for guests to work or use their computer.', CAST(N'2025-02-17T16:31:54.5555951' AS DateTime2), CAST(N'2025-02-17T16:31:54.5555948' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'21d91b41-0e29-4748-567b-08dd4f35ea9f', N'Wardrobe', N'Wardrobe for guests to store their personal belongings.', CAST(N'2025-02-17T16:31:54.5561014' AS DateTime2), CAST(N'2025-02-17T16:31:54.5561007' AS DateTime2))
INSERT [dbo].[Facility] ([Id], [Name], [Description], [CreateAt], [UpdateAt]) VALUES (N'8284cba8-87ed-4caf-779f-08dd4f361814', N'Wi-Fi 6G', N'High-speed internet access available throughout the house.', CAST(N'2025-02-17T16:33:10.7177659' AS DateTime2), NULL)
GO
INSERT [dbo].[HomeStay] ([Id], [MainImage], [Name], [OpenIn], [Description], [Standar], [isDeleted], [Address], [City], [isBooked], [CheckInTime], [CheckOutTime], [UserID]) VALUES (N'b35ec1cd-1c94-46b7-84b1-161302147266', N'https://localhost:7194/swagger/index.html', N'Sunrise Homestay', 2022, N'A beautiful homestay with ocean view.', 4, 0, N'123 Beach Road', N'Da Nang', 0, N'14:00', N'12:00', N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[HomeStay] ([Id], [MainImage], [Name], [OpenIn], [Description], [Standar], [isDeleted], [Address], [City], [isBooked], [CheckInTime], [CheckOutTime], [UserID]) VALUES (N'24160e85-75c2-453d-9f98-20c91cb32216', N'https://localhost:7194/swagger/index.html', N'Sunrise Homestay', 2022, N'A beautiful homestay with ocean view.', 4, 0, N'123 Beach Road', N'Da Nang', 0, N'14:00', N'12:00', N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[HomeStay] ([Id], [MainImage], [Name], [OpenIn], [Description], [Standar], [isDeleted], [Address], [City], [isBooked], [CheckInTime], [CheckOutTime], [UserID]) VALUES (N'7ea5d6f3-a1dc-44f0-918f-30b4652efb84', N'https://localhost:7194/swagger/index.html', N'Sunrise Homestay', 2022, N'A beautiful homestay with ocean view.', 4, 0, N'123 Beach Road', N'Da Nang', 0, N'14:00', N'12:00', N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[HomeStay] ([Id], [MainImage], [Name], [OpenIn], [Description], [Standar], [isDeleted], [Address], [City], [isBooked], [CheckInTime], [CheckOutTime], [UserID]) VALUES (N'da8950de-5482-4e5b-b8ad-32270a5e7f61', N'https://localhost:7194/swagger/index.html', N'Sunrise Homestay', 2022, N'A beautiful homestay with ocean view.', 4, 0, N'123 Beach Road', N'Da Nang', 0, N'14:00', N'12:00', N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[HomeStay] ([Id], [MainImage], [Name], [OpenIn], [Description], [Standar], [isDeleted], [Address], [City], [isBooked], [CheckInTime], [CheckOutTime], [UserID]) VALUES (N'0083c3b0-7997-472d-9cf7-610f146afaa4', N'https://localhost:7194/swagger/index.html', N'Sunrise Homestay', 2022, N'A beautiful homestay with ocean view.', 4, 0, N'123 Beach Road', N'Da Nang', 0, N'14:00', N'12:00', N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[HomeStay] ([Id], [MainImage], [Name], [OpenIn], [Description], [Standar], [isDeleted], [Address], [City], [isBooked], [CheckInTime], [CheckOutTime], [UserID]) VALUES (N'e6f859b3-3ec0-4326-a1d0-64a6d1f9422e', N'https://localhost:7194/swagger/index.html', N'Sunrise Homestay', 2022, N'A beautiful homestay with ocean view.', 4, 0, N'123 Beach Road', N'Da Nang', 0, N'14:00', N'12:00', N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[HomeStay] ([Id], [MainImage], [Name], [OpenIn], [Description], [Standar], [isDeleted], [Address], [City], [isBooked], [CheckInTime], [CheckOutTime], [UserID]) VALUES (N'b5e604df-1d59-447c-851a-7173cfbf8cc5', N'https://localhost:7194/swagger/index.html', N'Sunrise Homestay', 2022, N'A beautiful homestay with ocean view.', 4, 0, N'123 Beach Road', N'Da Nang', 0, N'14:00', N'12:00', N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[HomeStay] ([Id], [MainImage], [Name], [OpenIn], [Description], [Standar], [isDeleted], [Address], [City], [isBooked], [CheckInTime], [CheckOutTime], [UserID]) VALUES (N'09405096-08e5-4100-91a6-717648843528', N'https://localhost:7194/swagger/index.html', N'Sunrise Homestay', 2022, N'A beautiful homestay with ocean view.', 4, 0, N'123 Beach Road', N'Da Nang', 0, N'14:00', N'12:00', N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[HomeStay] ([Id], [MainImage], [Name], [OpenIn], [Description], [Standar], [isDeleted], [Address], [City], [isBooked], [CheckInTime], [CheckOutTime], [UserID]) VALUES (N'c3fc5590-8d17-43c4-83c1-76c705bcc291', N'https://localhost:7194/swagger/index.html', N'Sunrise Homestay', 2022, N'A beautiful homestay with ocean view.', 4, 0, N'123 Beach Road', N'Da Nang', 0, N'14:00', N'12:00', N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[HomeStay] ([Id], [MainImage], [Name], [OpenIn], [Description], [Standar], [isDeleted], [Address], [City], [isBooked], [CheckInTime], [CheckOutTime], [UserID]) VALUES (N'decdd859-429a-4b91-af02-7b0ce8ac0325', N'https://localhost:7194/swagger/index.html', N'Sunrise Homestay', 2022, N'A beautiful homestay with ocean view.', 4, 0, N'123 Beach Road', N'Da Nang', 0, N'14:00', N'12:00', N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[HomeStay] ([Id], [MainImage], [Name], [OpenIn], [Description], [Standar], [isDeleted], [Address], [City], [isBooked], [CheckInTime], [CheckOutTime], [UserID]) VALUES (N'df190b0b-e3ca-4670-84fa-a5403735ff9d', N'https://localhost:7194/swagger/index.html', N'Sunrise Homestay', 2022, N'A beautiful homestay with ocean view.', 4, 0, N'123 Beach Road', N'Da Nang', 0, N'14:00', N'12:00', N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[HomeStay] ([Id], [MainImage], [Name], [OpenIn], [Description], [Standar], [isDeleted], [Address], [City], [isBooked], [CheckInTime], [CheckOutTime], [UserID]) VALUES (N'097f4d29-6887-44e9-9fb7-ac4b62a8383f', N'https://localhost:7194/swagger/index.html', N'Sunrise Homestay', 2022, N'A beautiful homestay with ocean view.', 4, 0, N'123 Beach Road', N'Da Nang', 0, N'14:00', N'12:00', N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[HomeStay] ([Id], [MainImage], [Name], [OpenIn], [Description], [Standar], [isDeleted], [Address], [City], [isBooked], [CheckInTime], [CheckOutTime], [UserID]) VALUES (N'8db12ec0-6c09-47cf-a34f-b4b201bd9716', N'https://localhost:7194/swagger/index.html', N'Sunrise Homestay', 2022, N'A beautiful homestay with ocean view.', 4, 0, N'123 Beach Road', N'Da Nang', 0, N'14:00', N'12:00', N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[HomeStay] ([Id], [MainImage], [Name], [OpenIn], [Description], [Standar], [isDeleted], [Address], [City], [isBooked], [CheckInTime], [CheckOutTime], [UserID]) VALUES (N'2e41dbaf-2839-4cfd-afb7-b7ed075de3a3', N'https://localhost:7194/swagger/index.html', N'Sunrise Homestay', 2022, N'A beautiful homestay with ocean view.', 4, 0, N'123 Beach Road', N'Da Nang', 0, N'14:00', N'12:00', N'71061322-f826-4a01-b130-a2c2895d08f5')
INSERT [dbo].[HomeStay] ([Id], [MainImage], [Name], [OpenIn], [Description], [Standar], [isDeleted], [Address], [City], [isBooked], [CheckInTime], [CheckOutTime], [UserID]) VALUES (N'e34883f9-6188-42c2-aaf7-cdbff3e9bac3', N'https://localhost:7194/swagger/index.html', N'Sunrise Homestay', 2022, N'A beautiful homestay with ocean view.', 4, 0, N'123 Beach Road', N'Da Nang', 0, N'14:00', N'12:00', N'71061322-f826-4a01-b130-a2c2895d08f5')
GO
INSERT [dbo].[HomeStayFacility] ([HomeStayID], [FacilityID], [Quantity]) VALUES (N'2e41dbaf-2839-4cfd-afb7-b7ed075de3a3', N'd372f742-7580-47c5-5677-08dd4f35ea9f', 1)
INSERT [dbo].[HomeStayFacility] ([HomeStayID], [FacilityID], [Quantity]) VALUES (N'e34883f9-6188-42c2-aaf7-cdbff3e9bac3', N'a4ce8371-4309-428b-5668-08dd4f35ea9f', 2)
INSERT [dbo].[HomeStayFacility] ([HomeStayID], [FacilityID], [Quantity]) VALUES (N'e34883f9-6188-42c2-aaf7-cdbff3e9bac3', N'3324e6f4-9145-4090-5669-08dd4f35ea9f', 1)
GO
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'fcf92712-8b15-4231-b66d-025fc5008aeb', N'https://example.com/image3.jpg', N'b5e604df-1d59-447c-851a-7173cfbf8cc5', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'3cc4cc8a-6aec-4f03-95c4-06b1f91f0869', N'https://example.com/image2.jpg', N'e34883f9-6188-42c2-aaf7-cdbff3e9bac3', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'22fcb727-2c60-4ffa-b96e-0de4d109acb7', N'https://example.com/image2.jpg', N'097f4d29-6887-44e9-9fb7-ac4b62a8383f', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'f4bfaa1b-c487-4067-b2c6-0f0c126708aa', N'https://example.com/image2.jpg', N'8db12ec0-6c09-47cf-a34f-b4b201bd9716', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'3dc9a40d-2071-4294-b474-1c43b2f56229', N'https://example.com/image3.jpg', N'2e41dbaf-2839-4cfd-afb7-b7ed075de3a3', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'cc09c523-5b2b-45d5-bc1b-20ea7e8d0376', N'https://example.com/image3.jpg', N'e6f859b3-3ec0-4326-a1d0-64a6d1f9422e', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'401d4210-c316-4d48-aa2f-2e4a7549f4e0', N'https://example.com/image2.jpg', N'decdd859-429a-4b91-af02-7b0ce8ac0325', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'af96830b-fc03-42fd-8f29-325f1fccbdf4', N'https://example.com/image3.jpg', N'8db12ec0-6c09-47cf-a34f-b4b201bd9716', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'd55d16bd-ee17-4335-8f70-3af11247afa9', N'https://example.com/image3.jpg', N'c3fc5590-8d17-43c4-83c1-76c705bcc291', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'5863438a-00fa-454c-95a8-3ce4cc2be205', N'https://example.com/image2.jpg', N'2e41dbaf-2839-4cfd-afb7-b7ed075de3a3', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'5a0b9040-e122-4a05-990a-45b67ae33caf', N'https://example.com/image2.jpg', N'24160e85-75c2-453d-9f98-20c91cb32216', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'fc27cba9-1bf2-4975-bf74-46fa79622850', N'https://example.com/image3.jpg', N'097f4d29-6887-44e9-9fb7-ac4b62a8383f', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'905aee14-0280-442e-8c02-5b11bb4f27e4', N'https://example.com/image3.jpg', N'decdd859-429a-4b91-af02-7b0ce8ac0325', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'29d3cb26-6c2d-4022-a357-5b953c03410f', N'https://example.com/image3.jpg', N'7ea5d6f3-a1dc-44f0-918f-30b4652efb84', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'e01be699-2bfb-461b-b184-62f4fd6e6ac2', N'https://example.com/image3.jpg', N'b35ec1cd-1c94-46b7-84b1-161302147266', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'451056ca-812a-4bcc-8e02-64d4c461f396', N'https://example.com/image2.jpg', N'da8950de-5482-4e5b-b8ad-32270a5e7f61', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'8dad095b-6d09-407c-86d6-6b8278e07dff', N'https://example.com/image3.jpg', N'e34883f9-6188-42c2-aaf7-cdbff3e9bac3', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'61de62f7-6457-4f47-87c6-756e6f35b9a9', N'https://example.com/image3.jpg', N'24160e85-75c2-453d-9f98-20c91cb32216', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'79ddad06-3808-4c63-a190-7b29c0c8a2df', N'https://example.com/image2.jpg', N'c3fc5590-8d17-43c4-83c1-76c705bcc291', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'e6dae943-e6f8-45e9-91a7-9185382e970e', N'https://example.com/image2.jpg', N'7ea5d6f3-a1dc-44f0-918f-30b4652efb84', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'24488e7e-0d93-43e0-be82-a1952e0feb17', N'https://example.com/image2.jpg', N'0083c3b0-7997-472d-9cf7-610f146afaa4', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'4f2d4c53-2e05-454f-ac4e-a48885f6b30f', N'https://example.com/image3.jpg', N'da8950de-5482-4e5b-b8ad-32270a5e7f61', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'07afb87b-0e97-4f59-b6a8-a5b9de0ca60c', N'https://example.com/image3.jpg', N'0083c3b0-7997-472d-9cf7-610f146afaa4', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'22e55891-d3ab-4e43-9948-b82843a898e8', N'https://example.com/image3.jpg', N'df190b0b-e3ca-4670-84fa-a5403735ff9d', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'7a18ffa2-1572-4920-a397-c426ff037a79', N'https://example.com/image2.jpg', N'e6f859b3-3ec0-4326-a1d0-64a6d1f9422e', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'38e9ade3-89ed-4be6-8105-dc6b5526ee81', N'https://example.com/image2.jpg', N'09405096-08e5-4100-91a6-717648843528', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'e3b5e0da-9275-4188-a93a-df2e5f0736ff', N'https://example.com/image2.jpg', N'b5e604df-1d59-447c-851a-7173cfbf8cc5', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'2dad9531-4f6c-4911-8d5f-ea6c8f8a1af8', N'https://example.com/image2.jpg', N'df190b0b-e3ca-4670-84fa-a5403735ff9d', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'2a4f967f-e597-43c6-9646-fcc7987376c7', N'https://example.com/image2.jpg', N'b35ec1cd-1c94-46b7-84b1-161302147266', 0)
INSERT [dbo].[HomeStayImage] ([Id], [Image], [HomeStayID], [isDeleted]) VALUES (N'414ce499-57c5-406e-bb13-fcc7b404545f', N'https://example.com/image3.jpg', N'09405096-08e5-4100-91a6-717648843528', 0)
GO
INSERT [dbo].[RefreshTokens] ([Id], [UserId], [Token], [ExpirationDate]) VALUES (N'91df62a7-3a00-4e0e-a2f7-41512114331f', N'd87b4b72-609b-4979-b758-7771481da883', N'2xEF4WF3PE3DHMTQ8k3OrF+XGRNdmZZE94UB5jBTOsh1gPtWSzB0qcRLI7C1M6NCgvcFycUgHE11TvHiGljGxw==', CAST(N'2025-02-16T20:52:57.1327380' AS DateTime2))
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 

INSERT [dbo].[Roles] ([Id], [Name]) VALUES (1, N'Admin')
INSERT [dbo].[Roles] ([Id], [Name]) VALUES (2, N'Manager')
INSERT [dbo].[Roles] ([Id], [Name]) VALUES (3, N'User')
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO
INSERT [dbo].[Users] ([Id], [FullName], [Email], [Phone], [Address], [BirhDay], [Gender], [Avatar], [CitizenID], [PasswordHash], [IsEmailConfirmed], [IsDeleted], [RoleId], [CreatedAt], [LastModifiedAt]) VALUES (N'4b7b0200-70f9-416a-9a3f-29ccab0deec4', N'staff', N'staff@gmail.com', N'0987654123', N'Bình Thủy, Cần Thơ', NULL, NULL, NULL, NULL, N'$2a$11$zWvQWgoc5nd59bdetNY8Iuo6NUQudCyZ/.5iiOGijgIdLkLPulsju', 1, 0, 2, CAST(N'2025-02-17T15:54:20.4398365' AS DateTime2), CAST(N'2025-02-17T15:54:20.4398375' AS DateTime2))
INSERT [dbo].[Users] ([Id], [FullName], [Email], [Phone], [Address], [BirhDay], [Gender], [Avatar], [CitizenID], [PasswordHash], [IsEmailConfirmed], [IsDeleted], [RoleId], [CreatedAt], [LastModifiedAt]) VALUES (N'd87b4b72-609b-4979-b758-7771481da883', N'admin', N'admin@gmail.com', N'0987654321', N'Ninh Kiều, Cần Thơ', NULL, NULL, NULL, NULL, N'$2a$11$XN31FF0PxZRZc.TgbZ72qOmgYWCE.hyX/YETFrJaxS8sQ3R/FPHGe', 1, 0, 1, CAST(N'2025-02-17T15:54:20.3237613' AS DateTime2), CAST(N'2025-02-17T15:54:20.3237621' AS DateTime2))
INSERT [dbo].[Users] ([Id], [FullName], [Email], [Phone], [Address], [BirhDay], [Gender], [Avatar], [CitizenID], [PasswordHash], [IsEmailConfirmed], [IsDeleted], [RoleId], [CreatedAt], [LastModifiedAt]) VALUES (N'a85f272f-353e-4ff6-be2b-a15f1e7c0c47', N'user', N'user@gmail.com', N'0987654312', N'Phong Điền, Cần Thơ', NULL, NULL, NULL, NULL, N'$2a$11$BtxCSiriaSg1nj7KjTxdcuWFaFJU7HV1l13vlSvmqBf4p4D6CSkj6', 1, 0, 3, CAST(N'2025-02-17T15:54:20.5547826' AS DateTime2), CAST(N'2025-02-17T15:54:20.5547836' AS DateTime2))
INSERT [dbo].[Users] ([Id], [FullName], [Email], [Phone], [Address], [BirhDay], [Gender], [Avatar], [CitizenID], [PasswordHash], [IsEmailConfirmed], [IsDeleted], [RoleId], [CreatedAt], [LastModifiedAt]) VALUES (N'71061322-f826-4a01-b130-a2c2895d08f5', N'Huỳnh Hữu Nghĩa', N'tqbao.work@fpt.edu.vn', N'0832474699', N'', NULL, NULL, NULL, NULL, N'$2a$11$/siZzmgRXP.OKbwgVLNIwOI.1n3M8.uirejBJtHa6HY0CszmNEZOe', 1, 0, 1, CAST(N'2025-02-15T21:03:02.1903306' AS DateTime2), CAST(N'2025-02-15T21:03:02.1903318' AS DateTime2))
INSERT [dbo].[Users] ([Id], [FullName], [Email], [Phone], [Address], [BirhDay], [Gender], [Avatar], [CitizenID], [PasswordHash], [IsEmailConfirmed], [IsDeleted], [RoleId], [CreatedAt], [LastModifiedAt]) VALUES (N'3b141309-e6fb-432e-b5fb-d62803feabdb', N'Bùi Trí Tính', N'buitritinht@gmail.com', N'0914806492', N'string', NULL, NULL, NULL, NULL, N'$2a$11$HMNL7.k74ApHIkQHgMmJwuqKsVMPLhj5VzIjrmTdXxLH2HURIQv.W', 1, 0, 3, CAST(N'2025-02-17T09:33:29.6520494' AS DateTime2), CAST(N'2025-02-17T09:33:29.6520514' AS DateTime2))
INSERT [dbo].[Users] ([Id], [FullName], [Email], [Phone], [Address], [BirhDay], [Gender], [Avatar], [CitizenID], [PasswordHash], [IsEmailConfirmed], [IsDeleted], [RoleId], [CreatedAt], [LastModifiedAt]) VALUES (N'61d80aa8-bc73-4093-857c-dfddd1c78b88', N'Bùi Trí Tính', N'buitritinhadmin@gmail.com', N'0832474699', NULL, NULL, NULL, NULL, NULL, N'$2a$11$HMNL7.k74ApHIkQHgMmJwuqKsVMPLhj5VzIjrmTdXxLH2HURIQv.W', 1, 0, 1, CAST(N'2025-02-17T10:20:10.4065760' AS DateTime2), CAST(N'2025-02-17T10:20:10.4065781' AS DateTime2))
GO
INSERT [dbo].[Voucher] ([Id], [Image], [Code], [Discount], [Description], [QuantityUsed], [StartDate], [EndDate], [isDeleted]) VALUES (N'1911daaf-12ab-406f-8033-6a77b9bd48b2', N'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA', N'IBgTUF', 50, N'Giảm giá 50% cho đơn hàng trên 500.000 VND.', 10, CAST(N'2025-02-13T00:00:00.0000000' AS DateTime2), CAST(N'2025-02-20T23:59:59.0000000' AS DateTime2), 0)
INSERT [dbo].[Voucher] ([Id], [Image], [Code], [Discount], [Description], [QuantityUsed], [StartDate], [EndDate], [isDeleted]) VALUES (N'79c2383b-d74a-4c32-901f-afbf7b470b9f', N'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA', N'CkDkNV', 50, N'Giảm giá 50% cho đơn hàng trên 500.000 VND.', 10, CAST(N'2025-02-13T00:00:00.0000000' AS DateTime2), CAST(N'2025-02-20T23:59:59.0000000' AS DateTime2), 0)
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
