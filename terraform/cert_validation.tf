resource "aws_acm_certificate" "ssl_certificate" {
  provider          = aws.acm_provider
  domain_name       = var.domain_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "cloudflare_dns_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.ssl_certificate.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  name    = each.value.name
  content = each.value.record
  ttl     = 60
  type    = each.value.type
  zone_id = data.cloudflare_zone.site_zone.id
  proxied = false
}

resource "aws_acm_certificate_validation" "cert_validation" {
  certificate_arn         = aws_acm_certificate.ssl_certificate.arn
  validation_record_fqdns = [for record in cloudflare_dns_record.cert_validation : record.name]
}

