resource "cloudflare_ruleset" "cache_extensions_rules" {
  zone_id     = data.cloudflare_zone.site_zone.id
  name        = "Cache file extensions list"
  description = "Set cache settings for incoming requests"
  kind        = "zone"
  phase       = "http_request_cache_settings"

  rules = [
    {
      ref         = "cache_settings_custom_cache_key"
      description = "Set cache settings and custom cache key for file extension list"
      expression  = "(http.request.uri.path.extension in {\"${join("\" \"", var.cached_file_extensions)}\"})"
      action      = "set_cache_settings"
      action_parameters = {
        cache = true
        edge_ttl = {
          mode    = "override_origin"
          default = var.cache_ttl
        }
      }
    }
  ]
}
