using ItemsService.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

public class KendamaService {
    private readonly IMongoCollection<Kendama> _itemsCollection;

    public KendamaService(IOptions<MongoDbSettings> mongoDbSettings) {
        var mongoClient = new MongoClient(mongoDbSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(mongoDbSettings.Value.DatabaseName);
        _itemsCollection = mongoDatabase.GetCollection<Kendama>(mongoDbSettings.Value.CollectionName);
    }

    public async Task<List<Kendama>> GetAsync() => 
        await _itemsCollection.Find(_ => true).ToListAsync();

    public async Task<Kendama?> GetAsync(string id) =>
        await _itemsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<List<Kendama>> GetByIdsAsync(List<string> ids) {

        var filter = Builders<Kendama>.Filter.In(k => k.Id, ids);

        return await _itemsCollection.Find(filter).ToListAsync();
    }


    public async Task<List<Kendama>> GetByCategoryAsync(string category) {
        return await _itemsCollection
        .Find(k => k.Category == category) 
        .ToListAsync();
    }

    public async Task CreateAsync(Kendama newItem) =>
        await _itemsCollection.InsertOneAsync(newItem);

    public async Task UpdateAsync(string id, Kendama updatedItem) =>
        await _itemsCollection.ReplaceOneAsync(x => x.Id == id, updatedItem);

    public async Task RemoveAsync(string id) =>
        await _itemsCollection.DeleteOneAsync(x => x.Id == id);
}
