using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection.PortableExecutable;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using MosaicGallery.Models;
using MosaicGallery.Utils;

namespace MosaicGallery.Repositories
{
    public class GalleryRepository : BaseRepository, IGalleryRepository
    {
        public GalleryRepository(IConfiguration config) : base(config) { }

        public List<Gallery> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT g.Id AS GalleryId, g.Title, g.CreateDateTime, g.Content, g.ImageLocation,
                               c.Id AS CategoryId, c.[Name],
                               up.Id AS UserProfileId, up.FirstName, up.LastName, up.Username, up.Email,
                               up.CreateDateTime, up.ImageLocation, up.UserTypeId,
                               ut.Id AS UserTypeId, ut.[Name] AS 'UserType'
                          FROM Gallery g
                     LEFT JOIN Category c ON c.Id = g.CategoryId
                     LEFT JOIN UserProfile up ON up.Id = g.UserProfileId
                     LEFT JOIN UserType ut ON ut.Id = up.UserTypeId
                      ORDER BY g.CreateDateTime";

                    var reader = cmd.ExecuteReader();

                    var galleries = new List<Gallery>();
                    while (reader.Read())
                    {
                        //Used this line to shorten the code, the breakdown is in a reusable method:
                        galleries.Add(NewGalleryFromReader(reader));
                    }

                    reader.Close();

                    return galleries;
                }
            }
        }

        public List<Gallery> GetAllByUser(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT g.Id AS GalleryId, g.Title, g.CreateDateTime, g.Content, g.ImageLocation,
                               c.Id AS CategoryId, c.[Name],
                               up.Id AS UserProfileId, up.FirstName, up.LastName, up.Username, up.Email,
                               up.CreateDateTime, up.ImageLocation, up.UserTypeId,
                               ut.Id AS UserTypeId, ut.[Name] AS 'UserType'
                          FROM Gallery g
                     LEFT JOIN Category c ON c.Id = g.CategoryId
                     LEFT JOIN UserProfile up ON up.Id = g.UserProfileId
                     LEFT JOIN UserType ut ON ut.Id = up.UserTypeId
                         WHERE up.Id = @userProfileId
                      ORDER BY g.CreateDateTime";

                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
                    var reader = cmd.ExecuteReader();

                    var galleries = new List<Gallery>();

                    while (reader.Read())
                    {
                        //Used this line to shorten the code, the breakdown is in a reusable method:
                        galleries.Add(NewGalleryFromReader(reader));
                    }

                    reader.Close();

                    return galleries;
                }
            }
        }

        public Gallery GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT g.Id AS GalleryId, g.Title, g.CreateDateTime, g.Content, g.ImageLocation,
                               c.Id AS CategoryId, c.[Name],
                               up.Id AS UserProfileId, up.FirstName, up.LastName, up.Username, up.Email,
                               up.CreateDateTime, up.ImageLocation, up.UserTypeId,
                               ut.Id AS UserTypeId, ut.[Name] AS 'UserType'
                          FROM Gallery g
                     LEFT JOIN Category c ON c.Id = g.CategoryId
                     LEFT JOIN UserProfile up ON up.Id = g.UserProfileId
                     LEFT JOIN UserType ut ON ut.Id = up.UserTypeId
                         WHERE g.id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Gallery gallery = null;

                    if (reader.Read())
                    {
                        //Used this line to shorten the code, the breakdown is in a reusable method:
                        gallery = NewGalleryFromReader(reader);
                    }

                    reader.Close();

                    return gallery;
                }
            }
        }

        public Gallery GetUsersSingleGalleryById(int id, int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT g.Id AS GalleryId, g.Title, g.CreateDateTime, g.Content, g.ImageLocation,
                               c.Id AS CategoryId, c.[Name],
                               up.Id AS UserProfileId, up.FirstName, up.LastName, up.Username, up.Email,
                               up.CreateDateTime, up.ImageLocation, up.UserTypeId,
                               ut.Id AS UserTypeId, ut.[Name] AS 'UserType'
                          FROM Gallery g
                     LEFT JOIN Category c ON c.Id = g.CategoryId
                     LEFT JOIN UserProfile up ON up.Id = g.UserProfileId
                     LEFT JOIN UserType ut ON ut.Id = up.UserTypeId
                         WHERE g.id = @id AND g.UserProfileId = @userProfileId";

                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@userProfileId", userId);
                    var reader = cmd.ExecuteReader();

                    Gallery gallery = null;

                    if (reader.Read())
                    {
                        gallery = NewGalleryFromReader(reader);
                    }

                    reader.Close();

                    return gallery;
                }
            }
        }

        public void Add(Gallery gallery)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Gallery (
                            Title, Content, ImageLocation, CreateDateTime, CategoryId, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Title, @Content, @ImageLocation, @CreateDateTime, @CategoryId, @UserProfileId )";

                    DbUtils.AddParameter(cmd, "@Title", gallery.Title);
                    DbUtils.AddParameter(cmd, "@Content", gallery.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", gallery.ImageLocation);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", gallery.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@CategoryId", gallery.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", gallery.UserProfileId);

                    gallery.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Gallery gallery)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Gallery
                           SET Title = @title, 
                               Content = @content, 
                               ImageLocation = @imageLocation, 
                               CreateDateTime = @createDataTime, ,
                               CategoryId = @categoryId,
                               UserProfileId = @userProfileId
                         WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@title", gallery.Title);
                    cmd.Parameters.AddWithValue("@content", gallery.Content);
                    cmd.Parameters.AddWithValue("@imageLocation", gallery.ImageLocation);
                    cmd.Parameters.AddWithValue("@createDataTime", gallery.CreateDateTime);
                    cmd.Parameters.AddWithValue("@categoryId", gallery.CategoryId);
                    cmd.Parameters.AddWithValue("@userProfileId", gallery.UserProfileId);
                    cmd.Parameters.AddWithValue("@id", gallery.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int galleryId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Comment
                              WHERE GalleryId = @id

                        DELETE FROM Gallery
                              WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", galleryId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        //A reusable method:
        private Gallery NewGalleryFromReader (SqlDataReader reader)
        {
            return new Gallery()
            {
                Id = DbUtils.GetInt(reader, "GalleryId"),
                Title = DbUtils.GetString(reader, "Title"),
                Content = DbUtils.GetString(reader, "Content"),
                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime").ToString("MM/dd/yyyy"),
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                //GalleryCategory = new Category()
                //{
                //    Id = DbUtils.GetInt(reader, "CategoryId"),
                //    Name = DbUtils.GetString(reader, "Name")
                //},
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                    Username = DbUtils.GetString(reader, "Username"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    Email = DbUtils.GetString(reader, "Email"),
                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                    ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                    UserType = new UserType()
                    {
                        Id = DbUtils.GetInt(reader, "UserTypeId"),
                        Name = DbUtils.GetString(reader, "Name")
                    }
                },
            };
        }




    }
}
