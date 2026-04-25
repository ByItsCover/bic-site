provider "aws" {
  region = var.aws_region
}

provider "aws" {
  alias  = "acm_provider"
  region = var.aws_region
}
