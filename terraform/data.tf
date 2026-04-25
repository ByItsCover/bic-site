data "terraform_remote_state" "bic_infra" {
  backend = "remote"

  config = {
    organization = var.tfe_org_name
    workspaces = {
      name = var.bic_infra_workspace
    }
  }
}

data "terraform_remote_state" "bic_library_search" {
  backend = "remote"

  config = {
    organization = var.tfe_org_name
    workspaces = {
      name = var.bic_library_search_workspace
    }
  }
}

data "cloudflare_zone" "site_zone" {
  zone_id = var.cloudflare_zone_id
}
