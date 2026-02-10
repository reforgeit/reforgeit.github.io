---
layout: page
title: "Building an Internal Developer Platform on AWS EKS"
permalink: /work/internal-developer-platform/
---

At the company, teams were running on ECS with JavaScript AWS CDK for infrastructure. Each team wrote their own CDK code, and most didn't have deep infrastructure knowledge. Configs varied wildly between projects. Monitoring and alerting were inconsistent or missing entirely.

There had been earlier attempts to standardize things, but they didn't stick. Developers were left on their own. Repos and processes drifted apart. Teams spent their time firefighting Bamboo pipelines and CloudFormation deployments ("Cloud Frustration," as we called it) instead of shipping features.

## How the project started

My team identified the problem. We assessed EKS against ECS and chose EKS for the GitOps model and flexibility -- you can run Kubernetes on different cloud providers or even in a data center. We designed the architecture and built an MVP. That proof of concept quickly became the onboarding platform for new products and services the company was launching.

Separately, I also led an initiative to standardize CI/CD with GitHub Actions reusable workflows and composite actions. That helped across the board, even for teams that never moved to the platform.

## What we built

The platform was designed from scratch. EKS, ArgoCD, and Helm weren't used at the company before this. Backstage was just getting started. We built everything ourselves: GitHub organization configuration, reusable workflows, composite actions, Terraform modules, Helm charts.

The team was 5-7 people, with me leading the project. I oversaw priorities and architecture, started discussions on what was needed versus what wasn't, assigned work to the team. I also implemented a lot of it directly: Terraform and IaC for EKS setup across multiple accounts and regions, self-service namespace management, Helm chart development and reviews, reusable workflows, and application templates. We started with homemade bash scripts for scaffolding and later moved to copier for proper template management.

The stack:

- **ArgoCD** for GitOps deployments. Teams manage their own ArgoCD app definitions and self-manage their workloads through Argo.
- **Terraform** for infrastructure provisioning. Company-wide modules for consistent setups across accounts and regions.
- **GitHub Actions** with reusable workflows and composite actions, plugged into application templates.
- **Backstage** for application scaffolding. Create a repo from a template, plug it into the ecosystem, go.
- **NewRelic** for observability. Standardized dashboards and alerting come with every deployment.
- **Copier** for template management (replacing our earlier homemade bash scripts). Every repo created from our templates runs a daily scheduled workflow that compares its metadata against the source template. If the template has changed, the workflow runs `copier update` and opens a PR for the team to review. We deliberately didn't auto-merge -- we wanted devs aware of every change coming in. This means a fix or improvement to a template propagates to all downstream repos automatically, without anyone chasing teams to update manually. Both polyrepo and monorepo setups are supported.
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

<a href="/about/#selected-work" class="btn btn-secondary">&larr; Back to Selected Work</a>
