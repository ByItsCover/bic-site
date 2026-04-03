locals {
  site_bucket_id = data.terraform_remote_state.bic_infra.outputs.s3_site_bucket_id

  mime_map = {
    css         = "text/css"
    html        = "text/html"
    js          = "application/javascript"
    ico         = "image/x-icon"
    png         = "image/png"
    svg         = "image/svg+xml"
    webmanifest = "application/manifest+json"
    xml         = "application/xml"
    onnx        = "application/onnx"
  }

  files = fileset("${var.build_dir}/", "**")
  objects = {
    for file in local.files : file => {
      content_type = lookup(local.mime_map, element(split(".", basename(file)), -1), "application/unknown")
      source       = "${var.build_dir}/${file}"
    }
  }
}

resource "aws_s3_object" "upload_site" {
  for_each = local.objects

  bucket       = local.site_bucket_id
  key          = each.key
  source       = each.value.source
  etag         = filemd5(each.value.source)
  content_type = each.value.content_type
}
