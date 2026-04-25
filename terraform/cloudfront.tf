locals {
  site_bucket_id              = data.terraform_remote_state.bic_infra.outputs.s3_site_bucket_id
  site_bucket_regional_domain = data.terraform_remote_state.bic_infra.outputs.s3_site_bucket_regional_domain
}

/*
resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name              = local.site_bucket_regional_domain
    origin_access_control_id = aws_cloudfront_origin_access_control.current.id
    origin_id                = "${local.site_bucket_id}-origin"
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.domain_name} distribution"
  default_root_object = var.site_bucket_index_doc
  http_version        = "http2and3"

  aliases = [var.domain_name, "www.${var.domain_name}"]

  default_cache_behavior {
    origin_request_policy_id = aws_cloudfront_origin_request_policy.cdn.id
    cache_policy_id          = aws_cloudfront_cache_policy.cdn.id
    allowed_methods          = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods           = ["GET", "HEAD", "OPTIONS"]
    target_origin_id         = "${local.site_bucket_id}-origin"
    compress                 = true
    viewer_protocol_policy   = "redirect-to-https"
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.ssl_certificate.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}
*/
