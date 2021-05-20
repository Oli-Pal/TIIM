using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class AppUser
    {
        public Guid Id { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string UserName { get; set; }    
        [Required]
        public byte[] PasswordHash { get; set; }
        [Required]
        public byte[] PasswordSalt { get; set; }   
        public string Description { get; set; }
        [Required]
        public string City { get; set; }     
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime JoinDate { get; set; }


        public AppUser()
        {
            Id = Guid.NewGuid();
            JoinDate = DateTime.UtcNow;
        }
    }
}