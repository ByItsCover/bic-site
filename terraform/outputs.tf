output "website_url" {
  description = "Website URL (HTTPS)"
  value       = "https://${var.domain_name}"
}

output "cognito_pool_client_id" {
  description = "Client ID for Cognito User Pool"
  value       = aws_cognito_user_pool_client.auth_client.id
}
