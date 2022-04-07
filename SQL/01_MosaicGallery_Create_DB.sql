DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [UserType]
DROP TABLE IF EXISTS [Tag];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Gallery];
DROP TABLE IF EXISTS [GalleryTag];
DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [Favorite];
GO

CREATE TABLE [Category] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255)
)

CREATE TABLE [UserType] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255)
)

CREATE TABLE [Tag] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255)
)

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Username] nvarchar(255),
  [FirstName] nvarchar(255),
  [LastName] nvarchar(255),
  [Email] nvarchar(255),
  [CreateDateTime] datetime,
  [ImageLocation] nvarchar(255),
  [UserTypeId] int
)

CREATE TABLE [Gallery] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Title] nvarchar(255),
  [Content] nvarchar(255),
  [ImageLocation] nvarchar(255),
  [CreateDateTime] datetime,
  [CategoryId] int,
  [UserProfileId] int
)

CREATE TABLE [GalleryTag] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [GalleryId] int,
  [TagId] int
)

CREATE TABLE [Comment] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [GalleryId] int,
  [UserProfileId] int,
  [Subject] nvarchar(255),
  [Content] nvarchar(255),
  [CreateDateTime] datetime
)

CREATE TABLE [Favorite] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [GalleryId] int,
  [UserProfileId] int,
  [CreateDateTime] datetime
)

GO

ALTER TABLE [Gallery] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Favorite] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Favorite] ADD FOREIGN KEY ([GalleryId]) REFERENCES [Gallery] ([Id])
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([GalleryId]) REFERENCES [Gallery] ([Id])
GO

ALTER TABLE [Gallery] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
GO

ALTER TABLE [GalleryTag] ADD FOREIGN KEY ([TagId]) REFERENCES [Tag] ([Id])
GO

ALTER TABLE [GalleryTag] ADD FOREIGN KEY ([GalleryId]) REFERENCES [Gallery] ([Id])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
GO
