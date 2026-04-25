/*
 * Portions of this code are used under the MIT License.
 * Copyright (c) 2022 Alexander Mancevice
 * Original source: https://github.com/beachplum-io/brutalismbot/blob/main/blue/website/terraform.tf
*/

locals {
  bucket_id          = data.terraform_remote_state.bic_infra.outputs.s3_site_bucket_id
  library_search_url = data.terraform_remote_state.bic_library_search.outputs.library_search_url

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
    wasm        = "application/wasm"
  }

  files = fileset("${var.build_dir}/", "**")
}

resource "aws_s3_object" "upload_site" {
  for_each = {
    for file in local.files : file => {
      content_type = lookup(local.mime_map, split(".", basename(file))[-1], "application/unknown")
      source       = "${var.build_dir}/${file}"
    }
  }

  bucket       = local.bucket_id
  key          = each.key
  source       = each.value.source
  etag         = filemd5(each.value.source)
  content_type = each.value.content_type
}

resource "aws_s3_object" "site_config" {
  bucket       = local.bucket_id
  key          = "env-config.js"
  content      = <<EOF
  window._env_ = {
    ENVIRONMENT: "${var.environment}",
    LIBRARY_SEARCH_URL: "${local.library_search_url}",
  };
  EOF
  content_type = "application/javascript"
}
