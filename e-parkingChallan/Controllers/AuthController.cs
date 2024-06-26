using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using e_parkingChallan.Entities;
using e_parkingChallan.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace e_parkingChallan.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly ViolationService _violationService;

        public AuthController(UserService userService, ViolationService violationService)
        {
            _userService = userService;
            _violationService = violationService;
        }

        private static string GenerateJwtToken(User user)
        {
            var claims = new []
            {
                new Claim("id", user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("firstName", user.FirstName),
                new Claim("lastName", user.LastName),
                new Claim("contact", user.Contact),
                new Claim("role", user.Role),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("the-super-secret-key"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(30),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        [HttpPost("/login")]
        public async Task<ActionResult> Login(User user)
        {

            var _user = await _userService.GetUserAsync(user.Email);
            bool isValid = BCrypt.Net.BCrypt.Verify(user.Password, _user.Password);

            if (isValid)
            {
                string token = GenerateJwtToken(_user);
                return Ok(token);
            }

            return Unauthorized("Wrong password");
        }
        [HttpPost("/register")]
        public async Task<ActionResult> Register(User user)
        {
            try
            {
                var _user = await _userService.GetUserAsync(user.Email);
                if(_user != null) return StatusCode(403);
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                user.CreatedAt = DateTime.UtcNow;
                user.Role = "Driver";
                await _userService.CreateUserAsync(user);
                var newUser = await _userService.GetUserAsync(user.Email);
                await _violationService.CreateAnnualTax(new AnnualTax
                {
                    UserId = newUser.Id.ToString(),
                    Amount = 0,
                });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok();
        }
        [HttpGet("/reset")]
        public Task<ActionResult> ResetPassword()
        {


            return Task.FromResult<ActionResult>(Ok());
        }
    }
}