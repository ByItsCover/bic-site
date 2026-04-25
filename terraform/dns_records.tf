resource "cloudflare_dns_record" "cname" {
  zone_id = data.cloudflare_zone.site_zone.id
  name    = "@"
  type    = "CNAME"
  content = aws_cloudfront_distribution.cdn.domain_name
  ttl     = 1
  proxied = true
}
