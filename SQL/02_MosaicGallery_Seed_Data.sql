USE [MosaicGallery];
GO

-- SET IDENTITY_INSERT [UserType] ON
-- INSERT INTO [UserType] ([Id], [Name])
-- 	VALUES (1, 'Admin'), (2, 'Creator');
-- SET IDENTITY_INSERT [UserType] OFF

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO UserProfile (Id, Username, FirstName, LastName, Email, CreateDataTime, ImageLocation, UserTypeId) 
	VALUES (1, 'Admin', 'Admina', 'Strator', 'admin@example.com', '2022-04-04', 'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Prescription02&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=Gray02&graphicType=Hola&eyeType=Happy&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Tanned', 1);

INSERT INTO UserProfile (Id, Username, FirstName, LastName, Email, CreateDataTime, ImageLocation, UserTypeId) 
	VALUES (2, 'amanda01', 'Amanda', 'Ball', 'amanda@me.com', '2022-04-05', 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Blank&hairColor=Platinum&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Blue03&eyeType=Side&eyebrowType=Default&mouthType=Smile&skinColor=Light', 2);
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Gallery] ON
INSERT INTO [Gallery] ([Id], [Title], [Content], [ImageLocation], [CreateDataTime], [CategoryId], [UserProfileId])
	VALUES (1, 'Abstract Impressionism', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed mauris maximus, gravida tortor non, porttitor dui. Donec blandit, arcu ac pulvinar dignissim, augue leo auctor sapien, ut vestibulum sem tellus eget ante. Nullam eget nisi pharetra, ullamcorper odio ut, pharetra lorem. Praesent at pellentesque dui. Donec ultricies eget urna ac tincidunt. Donec euismod fermentum eleifend. Etiam pharetra porta arcu, eget pulvinar nisl accumsan ac. Integer ut lectus mi. Aliquam finibus neque facilisis, lacinia velit mollis, tincidunt enim.', 'https://news.artnet.com/app/news-upload/2016/09/mary-abbott-all-green-1954.jpg', '2022-04-04', 4, 1); 

INSERT INTO [Gallery] ([Id], [Title], [Content], [ImageLocation], [CreateDataTime], [CategoryId], [UserProfileId])
	VALUES (2, 'Typography in Art', 'Sed nec quam est. Proin efficitur velit dui, vitae imperdiet metus consectetur at. Duis rutrum augue sed mi rhoncus, ac condimentum enim euismod. In hac habitasse platea dictumst. Nam vel elementum tellus. Sed cursus ultricies est consectetur venenatis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean malesuada eu nunc nec pharetra. Cras ut tincidunt massa.', 'https://www.metmuseum.org/-/media/images/art/metpublication/cover/2014/cubism_the_leonard_a_lauder_collection.jpg?sc_lang=en', '2022-04-05', 15, 2);
SET IDENTITY_INSERT [Gallery] OFF

SET IDENTITY_INSERT [Comment] ON
INSERT INTO Comment (Id, GalleryId, UserProfileId, Subject, Content, CreateDataTime) 
	VALUES (1, 2, 1, 'Lorem ipsum', 'Aenean suscipit turpis sit amet erat semper rhoncus. Vivamus luctus eu ligula eu tempor. Mauris dignissim dolor at pulvinar tempus.', '2022-04-04');
INSERT INTO Comment (Id, GalleryId, UserProfileId, Subject, Content, CreateDataTime) 
	VALUES (2, 1, 2, 'Aenean suscipit turpis', 'Proin dui ligula, mattis in tellus condimentum, rhoncus eleifend ex. Morbi vitae metus ut ante feugiat malesuada nec ac nunc. Cras non lobortis nibh.', '2022-04-05');
SET IDENTITY_INSERT [Comment] OFF

SET IDENTITY_INSERT [Category] ON
INSERT INTO [Category] ([Id], [Name])
	VALUES (1, 'Modernism'), (2, 'Baroque'), (3, 'Sculpture'), (4, 'Abstract Expressionism'), (5, 'Architecture'),
	   (6, 'Art Deco/Art Nouveau'), (7, 'Cubism'), (8, 'Impressionism'), (9, 'Illustration'), (10, 'Digital Art'), (11, 'Pop Art'), (12, 'Photography'), (13, 'Street Art'), (14, 'Minimalism'), (15, 'Other')
SET IDENTITY_INSERT [Category] OFF

SET IDENTITY_INSERT [Tag] ON
INSERT INTO [Tag] ([Id], [Name])
	VALUES (1, 'Portrait'), (2, 'Female Artists'), (3, 'Painting'), (4, 'Sketch'), (5, 'Modern');
SET IDENTITY_INSERT [Tag] OFF

SET IDENTITY_INSERT [GalleryTag] ON
INSERT INTO [GaleryTag] ([Id], [GalleryId], [TagId])
	VALUES (1, 1, 2);
INSERT INTO [GaleryTag] ([Id], [GalleryId], [TagId])
	VALUES (2, 2, 5);
SET IDENTITY_INSERT [GalleryTag] OFF

SET IDENTITY_INSERT [Favorite] ON
INSERT INTO [Favorite] ([Id], [GalleryId], [UserProfileId], [CreateDataTime])
	VALUES (1, 2, 1, '2022-04-04');
INSERT INTO [Favorite] ([Id], [GalleryId], [UserProfileId], [CreateDataTime])
	VALUES (2, 1, 2, '2022-04-05');
SET IDENTITY_INSERT [Favorite] OFF

