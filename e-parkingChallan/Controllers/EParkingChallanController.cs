using System.IdentityModel.Tokens.Jwt;
using e_parkingChallan.Entities;
using e_parkingChallan.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace e_parkingChallan.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EParkingChallanController : ControllerBase
    {
        private readonly LocationService _locationService;
        private readonly VehicleService _vehicleService;
        private readonly ViolationService _violationService;

        public EParkingChallanController(ViolationService violationService,
            LocationService locationService,
            VehicleService vehicleService)
        {
            _violationService = violationService;
            _locationService = locationService;
            _vehicleService = vehicleService;
        }

        private JwtSecurityToken ExtractToken()
        {

            if (Request.Headers.ContainsKey("Authorization"))
            {
                string headerVal = Request.Headers.Authorization;
                headerVal = headerVal.Replace("Bearer ", "");
                var tokenHandler = new JwtSecurityTokenHandler();
                var tockenS = tokenHandler.ReadToken(headerVal) as JwtSecurityToken;
                return tockenS;
            }
            return null;
        }

        [HttpGet("/violations")]
        public async Task<ActionResult<List<Violation>>> GetViolations(string input, int pageNumber = 1, int pageSize = 10)
        {

            string id = ExtractToken().Claims.First(claim => claim.Type == "id").Value;
            input ??= id;

            var violations = await _violationService.GetViolationsAsync(input, pageNumber, pageSize);
            var docCount = await _violationService.CountViolations(input);
            return Ok(
                new {
                    violations,
                    pages = docCount/pageSize,
                    pageNumber
                }
            );
        }

        [HttpPost("/violations/add")]
        public async Task<ActionResult> CreateViolation(Violation violation)
        {
            string id = ExtractToken().Claims.First(claim => claim.Type == "id").Value;
            if (violation.OfficerId.ToString() == id)
            {
                await _violationService.AddViolationAsync(violation);
                return Ok();
            }
            return Unauthorized("You are not Authorized");
        }

        [HttpGet("/vehicles")]
        public async Task<ActionResult<List<Violation>>> GetVehicles()
        {

            string id = ExtractToken().Claims.First(claim => claim.Type == "id").Value;
            Console.WriteLine(id);

            var vehicles = await _vehicleService.GetVehiclesAsync(new ObjectId(id));
            return Ok(vehicles);
        }

        [HttpPost("/vehicles/add")]
        public async Task<ActionResult> AddVehicle(Vehicle vehicle)
        {
            string id = ExtractToken().Claims.First(claim => claim.Type == "id").Value;
            if (vehicle.OwnerId.ToString() == id)
            {
                await _vehicleService.AddVehicleAsync(vehicle);
                return Ok();
            }
            return Unauthorized("You are not Authorized");
        }

        [HttpGet("/locations")]
        public async Task<ActionResult<List<Violation>>> GetLocations(string input)
        {

            var locations = await _locationService.GetLocationsAsync(input);

            return Ok(locations);
        }

        [HttpPost("/payment")]
        public async Task<ActionResult> Payment(Payment payment)
        {
            await _violationService.AddPaymentAsync(payment);
            return Ok();
        }

        [HttpGet("/annualTax")]
        public async Task<ActionResult<List<Violation>>> GetAnnualTax()
        {
            string id = ExtractToken().Claims.First(claim => claim.Type == "id").Value;

            var annualTax = await _violationService.GetAnnualTaxAsync(new ObjectId(id));

            return Ok(annualTax);
        }

        [HttpPost("/annualTax/add")]
        public async Task<ActionResult> AddToAnnualTax(double amount)
        {
            string id = ExtractToken().Claims.First(claim => claim.Type == "id").Value;
            await _violationService.UpdateAnnualTask(new ObjectId(id), amount);
            return Ok();
        }
    }
}