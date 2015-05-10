/**
 * Defaults
 */

module.exports = {
    es_url: "http://localhost:9200",
    index_settings: {
        settings: {
            index: {
                number_of_shards: 2,
                number_of_replicas: 0,
                refresh_interval: 1
            }
        }
    }
};