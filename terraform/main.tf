locals {
  site_bucket_id = data.terraform_remote_state.bic_infra.outputs.s3_site_bucket_id
  site_path      = "${var.build_dir}/"
}

resource "aws_s3_object" "upload_site" {
  for_each = fileset("${path.root}/", "*")

  bucket = local.site_bucket_id
  key    = each.value
  source = "${local.site_path}/${each.value}"
  etag   = filemd5("${local.site_path}/${each.value}")
}
