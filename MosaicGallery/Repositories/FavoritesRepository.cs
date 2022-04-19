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
    public class FavoritesRepository : BaseRepository, IFavoritesRepository
    {
        public FavoritesRepository(IConfiguration config) : base(config) { }

        public List<Favorites> GetAllFavsByUser(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT f.Id AS FavoritesId, f.CreateDateTime,
                               g.Id AS GalleryId,
                               up.Id AS UserProfileId, up.FirstName, up.LastName, up.Username, up.Email,
                               up.CreateDateTime, up.ImageLocation AS AvatarImage, up.UserTypeId,
                               ut.Id AS UserTypeId, ut.[Name] AS 'UserType'
                          FROM Favorites f
                     LEFT JOIN Gallery g ON g.Id = f.GalleryId
                     LEFT JOIN UserProfile up ON up.Id = f.UserProfileId
                     LEFT JOIN UserType ut ON ut.Id = up.UserTypeId
                         WHERE up.Id = @userProfileId
                      ORDER BY f.CreateDateTime";

                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
                    var reader = cmd.ExecuteReader();

                    var favorites = new List<Favorites>();
                    while (reader.Read())
                    {
                        //Used this line to shorten the code, the breakdown is in a reusable method:
                        favorites.Add(NewFavoritesFromReader(reader));
                    }

                    reader.Close();

                    return favorites;
                }
            }
        }

        public void AddToFavs(Favorites favorites)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Favorites (
                                GalleryId, CreateDateTime, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @GalleryId, @CreateDateTime, @UserProfileId )";

                    DbUtils.AddParameter(cmd, "@GalleryId", favorites.GalleryId);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", favorites.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@UserProfileId", favorites.UserProfileId);

                    favorites.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteFromFavs(int galleryId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Favorites
                              WHERE GalleryId = @GalleryId
                        ";

                    cmd.Parameters.AddWithValue("@GalleryId", galleryId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        //A reusable method:
        private Favorites NewFavoritesFromReader(SqlDataReader reader)
        {
            return new Favorites()
            {
                Id = DbUtils.GetInt(reader, "FavoritesId"),
                GalleryId = DbUtils.GetInt(reader, "GalleryId"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime").ToString("MM/dd/yyyy"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                    Username = DbUtils.GetString(reader, "Username"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    Email = DbUtils.GetString(reader, "Email"),
                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                    ImageLocation = DbUtils.GetString(reader, "AvatarImage"),
                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                    UserType = new UserType()
                    {
                        Id = DbUtils.GetInt(reader, "UserTypeId"),
                        Name = DbUtils.GetString(reader, "UserType")
                    }
                },
            };
        }
    }
}