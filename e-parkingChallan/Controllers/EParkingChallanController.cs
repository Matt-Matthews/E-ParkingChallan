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

        public EParkingChallanController(ViolationService violationService, LocationService locationService, VehicleService vehicleService)
        {
            _violationService = violationService;
            _locationService = locationService;
            _vehicleService = vehicleService;
        }

        [HttpGet("/violations")]
        public async Task<ActionResult<List<Violation>>> GetViolations(string input)
        {
            string id = "from token";
            if (input == null) input = id;
            var violations = await _violationService.GetViolationsAsync(input);
            return Ok(violations);
        }

        [HttpPost("/violations/add")]
        public async Task<ActionResult> CreateViolation(Violation violation)
        {
            
            await _violationService.AddViolationAsync(violation);
            return Ok();
        }

        [HttpGet("/vehicles")]
        public async Task<ActionResult<List<Violation>>> GetVehicles()
        {

            string id = "From token";

            var vehicles = await _vehicleService.GetVehiclesAsync(new ObjectId(id));
            return Ok(vehicles);
        }

        [HttpPost("/vehicles/add")]
        public async Task<ActionResult> AddVehicle(Vehicle vehicle)
        {
            await _vehicleService.AddVehicleAsync(vehicle);
            return Ok();
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
            string id = "from token";

            var annualTax = await _violationService.GetAnnualTaxAsync(new ObjectId(id));

            return Ok(annualTax);
        }

        [HttpPost("/annualTax/add")]
        public async Task<ActionResult> AddToAnnualTax(double amount)
        {
            string id = "token";
            await _violationService.UpdateAnnualTask(new ObjectId(id), amount);
            return Ok();
        }
    }
}