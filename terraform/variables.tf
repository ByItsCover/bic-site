# General AWS

variable "aws_region" {
  type        = string
  description = "AWS Region"
}

variable "environment" {
  type        = string
  description = "Deployment Environment"
}

# Terraform Cloud

variable "tfe_org_name" {
  type        = string
  description = "Terraform Cloud organization name"
  default     = "ByItsCover"
}

variable "bic_infra_workspace" {
  type        = string
  description = "Terraform Cloud Workspace BIC-Infra name"
}

variable "bic_library_search_workspace" {
  type        = string
  description = "Terraform Cloud Workspace BIC-Library-Search name"
}

# S3

variable "build_dir" {
  type        = string
  description = "Build directory of static site for upload"
  default     = "."
}
