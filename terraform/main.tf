locals {
  site_bucket_id = data.terraform_remote_state.bic_infra.outputs.s3_site_bucket_id
  site_path      = "${build_dir}/${var.site_bucket_index_doc}"
}

resource "aws_s3_object" "upload_site" {
  bucket = local.site_bucket_id
  key    = var.site_bucket_index_doc
  source = local.site_path

  etag         = filemd5(local.site_path)
  content_type = "text/html"
}
