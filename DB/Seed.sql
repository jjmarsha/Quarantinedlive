/****** Object:  Table [dbo].[Cat_category]    Script Date: 3/19/2020 1:25:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_category](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Info] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Cat_category] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Event]    Script Date: 3/19/2020 1:25:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Event](
	[Id] [uniqueidentifier] NOT NULL,
	[Title] [varchar](100) NULL,
	[Topic] [varchar](100) NULL,
	[HostName] [varchar](100) NULL,
	[Groupcall] [varchar](100) NULL,
	[Link] [varchar](max) NULL,
	[Language] [varchar](50) NULL,
	[Date] [varchar](50) NULL,
	[Time] [varchar](50) NULL,
	[Description] [varchar](max) NULL,
	[DateCreated] [datetime2](7) NULL,
 CONSTRAINT [PK_Event] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Event_Category]    Script Date: 3/19/2020 1:25:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Event_Category](
	[ID] [uniqueidentifier] NOT NULL,
	[Id_Event] [uniqueidentifier] NULL,
	[Id_Category] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Event_Category] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Event_Category]  WITH CHECK ADD  CONSTRAINT [FK_Event_Category_Cat_category] FOREIGN KEY([Id_Category])
REFERENCES [dbo].[Cat_category] ([Id])
GO
ALTER TABLE [dbo].[Event_Category] CHECK CONSTRAINT [FK_Event_Category_Cat_category]
GO
ALTER TABLE [dbo].[Event_Category]  WITH CHECK ADD  CONSTRAINT [FK_Event_Category_Event] FOREIGN KEY([Id_Event])
REFERENCES [dbo].[Event] ([Id])
GO
ALTER TABLE [dbo].[Event_Category] CHECK CONSTRAINT [FK_Event_Category_Event]
GO
