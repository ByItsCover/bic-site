<!-- BEGIN_TF_DOCS -->
Portions of this code are used under the MIT License.
Copyright (c) 2022 Alexander Mancevice
Original source: https://github.com/beachplum-io/brutalismbot/blob/main/blue/website/terraform.tf

## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_terraform"></a> [terraform](#requirement\_terraform) | >= 1.2 |
| <a name="requirement_aws"></a> [aws](#requirement\_aws) | ~> 6.0 |
| <a name="requirement_cloudflare"></a> [cloudflare](#requirement\_cloudflare) | ~> 5 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider\_aws) | 6.58.0 |
| <a name="provider_aws.acm_provider"></a> [aws.acm\_provider](#provider\_aws.acm\_provider) | 6.58.0 |
| <a name="provider_cloudflare"></a> [cloudflare](#provider\_cloudflare) | 5.23.0 |
| <a name="provider_terraform"></a> [terraform](#provider\_terraform) | n/a |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [aws_acm_certificate.ssl_certificate](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/acm_certificate) | resource |
| [aws_acm_certificate_validation.cert_validation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/acm_certificate_validation) | resource |
| [aws_cloudfront_distribution.cdn](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution) | resource |
| [aws_s3_object.site_config](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_object) | resource |
| [aws_s3_object.upload_site](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_object) | resource |
| [cloudflare_dns_record.cert_validation](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/dns_record) | resource |
| [cloudflare_dns_record.cname](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/dns_record) | resource |
| [cloudflare_dns_record.www_cname](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/dns_record) | resource |
| [cloudflare_ruleset.cache_extensions_rules](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) | resource |
| [cloudflare_zone.site_zone](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/data-sources/zone) | data source |
| [terraform_remote_state.bic_infra](https://registry.terraform.io/providers/hashicorp/terraform/latest/docs/data-sources/remote_state) | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_aws_region"></a> [aws\_region](#input\_aws\_region) | AWS Region | `string` | n/a | yes |
| <a name="input_bic_infra_workspace"></a> [bic\_infra\_workspace](#input\_bic\_infra\_workspace) | Terraform Cloud Workspace BIC-Infra name | `string` | n/a | yes |
| <a name="input_bic_library_search_workspace"></a> [bic\_library\_search\_workspace](#input\_bic\_library\_search\_workspace) | Terraform Cloud Workspace BIC-Library-Search name | `string` | n/a | yes |
| <a name="input_build_dir"></a> [build\_dir](#input\_build\_dir) | Build directory of static site for upload | `string` | `"."` | no |
| <a name="input_cache_ttl"></a> [cache\_ttl](#input\_cache\_ttl) | Custom cache Time To Live in seconds | `number` | `86400` | no |
| <a name="input_cached_file_extensions"></a> [cached\_file\_extensions](#input\_cached\_file\_extensions) | File extensions to be marked as cacheable by CloudFlare | `list(string)` | n/a | yes |
| <a name="input_cloudflare_api_token"></a> [cloudflare\_api\_token](#input\_cloudflare\_api\_token) | API Token for CloudFlare provider | `string` | n/a | yes |
| <a name="input_cloudflare_zone_id"></a> [cloudflare\_zone\_id](#input\_cloudflare\_zone\_id) | CloudFlare Zone ID | `string` | n/a | yes |
| <a name="input_domain_name"></a> [domain\_name](#input\_domain\_name) | Domain name for site | `string` | n/a | yes |
| <a name="input_environment"></a> [environment](#input\_environment) | Deployment Environment | `string` | n/a | yes |
| <a name="input_site_bucket_index_doc"></a> [site\_bucket\_index\_doc](#input\_site\_bucket\_index\_doc) | Index document file name within site S3 bucket | `string` | `"index.html"` | no |
| <a name="input_tfe_org_name"></a> [tfe\_org\_name](#input\_tfe\_org\_name) | Terraform Cloud organization name | `string` | `"ByItsCover"` | no |
| <a name="input_token_config"></a> [token\_config](#input\_token\_config) | Configuration for auth token expiration times | <pre>object({<br/>    access_token  = number # Access token valid for 1 hour<br/>    id_token      = number # ID token valid for 1 hour<br/>    refresh_token = number # Refresh token valid for 30 days<br/>  })</pre> | <pre>{<br/>  "access_token": 1,<br/>  "id_token": 1,<br/>  "refresh_token": 30<br/>}</pre> | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_website_url"></a> [website\_url](#output\_website\_url) | Website URL (HTTPS) |
<!-- END_TF_DOCS -->