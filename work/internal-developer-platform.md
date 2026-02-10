---
layout: page
title: "Building an Internal Developer Platform on AWS EKS"
permalink: /work/internal-developer-platform/
---

At the company, teams ran their services on ECS, deployed via CloudFormation stacks synthesized from AWS CDK (JavaScript). Each team wrote their own CDK code, and most didn't have deep infrastructure knowledge. Configs varied wildly between projects. Monitoring and alerting were inconsistent or missing entirely.

There had been earlier attempts to standardize things, but they didn't stick. Developers were left on their own. Repos and processes drifted apart. Teams spent their time firefighting Bamboo pipelines (Java specs and later YAML specs) and CloudFormation deployments ("Cloud Frustration," as we called it) instead of shipping features.

## How the project started

My team identified the problem. We assessed EKS against ECS and chose EKS for the GitOps model and flexibility -- you can run Kubernetes on different cloud providers or even in a data center. We designed the architecture and built an MVP. That proof of concept quickly became the onboarding platform for new products and services the company was launching.

Separately, I also led an initiative to standardize CI/CD with GitHub Actions reusable workflows and composite actions. That work started during the [Bitbucket to GitHub migration](/work/github-migration/) and helped across the board, even for teams that never moved to the platform.

## What we built

The platform was designed from scratch. EKS, ArgoCD, and Helm weren't used at the company before this. Backstage was in use but just getting wider adoption -- we provided the first self-service templates. We built everything ourselves: GitHub organization configuration via Terraform (org secrets, variables, and OIDC role access to AWS -- mapping repos to roles to accounts), reusable workflows, composite actions, Terraform modules, Helm charts.

The team was 5-7 people, with me leading the project. I oversaw priorities and architecture, started discussions on what was needed versus what wasn't, assigned work to the team. I also implemented a lot of it directly: Terraform and IaC for EKS setup across multiple accounts and regions, self-service namespace management, Helm chart development and reviews, reusable workflows, and application templates (initially bash scripts, later migrated to copier).

The stack:

- **ArgoCD** for GitOps deployments. Teams manage their own ArgoCD app definitions and self-manage their workloads through Argo.
- **Terraform** for infrastructure provisioning. Company-wide modules for consistent setups across accounts and regions.
- **GitHub Actions** with reusable workflows and composite actions, plugged into application templates.
- **Backstage** for application scaffolding. Create a repo from a template, pre-wired with ArgoCD, GitHub Actions, NewRelic, and Helm -- ready to deploy.
- **NewRelic** for observability. Standardized dashboards and alerting come with every deployment.
- **Copier** for template management. Repos created from our templates run a daily workflow that checks for upstream template changes and opens a PR via `copier update` if anything changed. No auto-merge -- devs review every update. Template fixes propagate to all downstream repos automatically. Supports both polyrepo and monorepo setups.
- **Release Please** embedded into essentially everything releasable: reusable workflows, composite actions, Helm charts, Terraform modules, copier templates, and repos created from templates. Conventional commits plus semantic versioning for all of it.

## How teams use it

A developer creates a new repo from a Backstage template. The repo comes pre-wired with CI/CD workflows, infrastructure definitions, a Helm chart, and monitoring configuration. They customize what they need and deploy through ArgoCD. Within minutes they have a working app on production with dashboards and alerts in NewRelic.

Teams own their components. They use our predefined Helm charts with available customizations, or bring their own. Same with the reusable workflows. They control their apps through ArgoCD and see their data in NewRelic.

No support needed unless something unusual comes up.

## The result

Adoption was organic for some teams, mandated for certain projects. It's now the standard way to create new applications at the company.

30+ teams use the platform. You can go from an empty repo to a deployed app on production with monitoring in a few minutes.

## Tech stack

AWS EKS, ArgoCD, Terraform, GitHub Actions, Backstage, NewRelic, Helm, Karpenter, Copier, Release Please, ALB Controller, External DNS, External Secrets

---

<a href="/work/" class="btn btn-secondary">&larr; Back to Selected Work</a>
