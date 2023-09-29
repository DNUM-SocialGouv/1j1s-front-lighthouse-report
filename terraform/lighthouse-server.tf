module "lighthouse_app" {
  source = "scalingo-community/app/scalingo"
  version = "0.3.0"

  stack = "scalingo-22"

  name = "1j1s-front-lighthouse-report"

  containers = {
    web = {
      size   = "L"
      amount = 1
    }
  }

  github_integration = {
    repo_url            = "https://github.com/DNUM-SocialGouv/1j1s-front-lighthouse-report"
    branch              = var.branche_git
    auto_deploy_enabled = true
  }

  # Les variables DATABASE_* sont configurées automatiquement par l'add-on Postgres
  # et nous n'avons pas besoin d'ajouter de variables d'environnement supplémentaires
  environment = {}

  addons = [
    {
      provider = "postgresql"
      plan     = "postgresql-starter-512"
    }
  ]

  log_drains = (var.logstash_uri != null) ? [
    {
      type = "elk"
      url  = sensitive(var.logstash_uri)
    }
  ] : null

  router_logs = true
}

moved {
  from = module.front_app
  to   = module.lighthouse_app
}
