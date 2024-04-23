using System.IdentityModel.Tokens.Jwt;
using e_parkingChallan.Entities;
using e_parkingChallan.Services;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<List<Violation>>> GetViolations([FromQuery] PageQuery pageQuery)
        {
            string role = ExtractToken().Claims.First(claim => claim.Type == "role").Value;

            if (role == "Officer")
            {
                var _violations = await _violationService.GetViolationsAsync(pageNumber: pageQuery.PageNumber, pageSize: pageQuery.PageSize);
                Console.WriteLine(_violations[0].Id);
                var _docCount = await _violationService.CountViolations();
                
                return Ok(
                    new
                    {
                        violations = _violations,
                        pages = (int)Math.Floor((double)_docCount / pageQuery.PageNumber) + 1,
                        pageNumber = pageQuery.PageNumber
                    }
                );
            }

            string id = ExtractToken().Claims.First(claim => claim.Type == "id").Value;
            var violations = await _violationService.GetViolationsByIDAsync(id, pageNumber: pageQuery.PageNumber, pageSize: pageQuery.PageSize);
            Console.WriteLine(violations[0].Id);
            var docCount = await _violationService.CountViolationsByID(id);
            return Ok(
                new
                {
                    violations,
                    pages = (int)Math.Floor((double)docCount / pageQuery.PageSize) + 1,
                    pageNumber = pageQuery.PageNumber
                }
            );
        }

        [HttpPost("/violations/add")]
        public async Task<ActionResult> CreateViolation(Violation violation)
        {
            string id = ExtractToken().Claims.First(claim => claim.Type == "id").Value;
            if (violation.OfficerId.ToString() == id)
            {
                var vehicle = await _vehicleService.GetVehicleByRegAsync(violation.RegNum);
                if (vehicle != null) violation.OwnerId = vehicle.OwnerId;
                await _violationService.AddViolationAsync(violation);
                return Ok();
            }
            return Unauthorized("You are not Authorized");
        }

        [HttpGet("/vehicles")]
        public async Task<ActionResult<List<Violation>>> GetVehicles()
        {
            string role = ExtractToken().Claims.First(claim => claim.Type == "role").Value;
            if (role == "Driver")
            {
                string id = ExtractToken().Claims.First(claim => claim.Type == "id").Value;
                Console.WriteLine(id);

                var _vehicles = await _vehicleService.GetVehiclesByIdAsync(id);
                return Ok(_vehicles);
            }
            var vehicles = await _vehicleService.GetVehiclesAsync();
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

            var annualTax = await _violationService.GetAnnualTaxAsync(id);

            return Ok(annualTax);
        }

        [HttpPost("/annualTax/add")]
        public async Task<ActionResult> AddToAnnualTax(double amount)
        {
            string id = ExtractToken().Claims.First(claim => claim.Type == "id").Value;
            await _violationService.UpdateAnnualTask(id, amount);
            return Ok();
        }
    }
}