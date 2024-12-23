using Microsoft.AspNetCore.Mvc;
using ItemsService.Models;

[ApiController]
[Route("api/[controller]")]
public class KendamaController : ControllerBase {
    private readonly KendamaService _itemService;

    public KendamaController(KendamaService kendamaService) {
        _itemService = kendamaService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Kendama>>> Get() => 
        await _itemService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Kendama>> Get(string id) {
        var item = await _itemService.GetAsync(id);
        if (item is null) {
            return NotFound();
        }
        return item;
    }

    [HttpPost("ids")]
    public async Task<ActionResult<List<Kendama>>> GetByIds([FromBody] List<string> ids) {
        if (ids == null || ids.Count == 0) {
            return BadRequest("No IDs provided.");
        }

        var items = await _itemService.GetByIdsAsync(ids);
    
        if (items == null || items.Count == 0) {
            return NotFound("No items found for the provided IDs.");
        }

        return Ok(items);
    }

    [HttpGet("filter")]
    public async Task<ActionResult<List<Kendama>>> GetByCategory([FromQuery] string category) {
        var items = await _itemService.GetByCategoryAsync(category);
        if (items == null || items.Count == 0) {
            return NotFound("Кендамы с указанной категорией не найдены.");
        }
        return Ok(items);
    }


    [HttpPost]
    public async Task<IActionResult> Post(Kendama newKendama) {
        await _itemService.CreateAsync(newKendama);
        return CreatedAtAction(nameof(Get), new { id = newKendama.Id }, newKendama);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Kendama updatedItem) {
        var item = await _itemService.GetAsync(id);
        if (item is null) {
            return NotFound();
        }
        updatedItem.Id = item.Id;
        await _itemService.UpdateAsync(id, updatedItem);
        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id) {
        var item = await _itemService.GetAsync(id);
        if (item is null) {
            return NotFound();
        }
        await _itemService.RemoveAsync(id);
        return NoContent();
    }
}
