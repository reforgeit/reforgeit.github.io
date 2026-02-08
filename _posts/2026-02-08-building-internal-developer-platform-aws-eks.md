---
layout: post
title: "Building an Internal Developer Platform on AWS EKS"
date: 2026-02-08
author: "Milosz Czajkowski"
tags: [case-study, aws, kubernetes, platform-engineering]
excerpt: "How I designed and built an internal developer platform at Keyloop that 30+ teams now use for autonomous deployments."
---

At Keyloop, engineering teams were deploying through a patchwork of scripts, manual processes, and tribal knowledge. Every team did it differently. Deployments were slow, error-prone, and required handholding from the infrastructure team.

I was brought on as a DevOps Engineer to fix this. By the time I became Technical Lead, we had a platform that 30+ teams use to deploy autonomously.

## The problem

No standard way to deploy. Teams were stuck waiting on a small infrastructure team for environment setup, pipeline configuration, and deployment support. The CI/CD tooling was split between Bitbucket Pipelines and Bamboo, with no shared patterns. Onboarding a new service took days of back-and-forth.

## What I built

An internal developer platform on AWS EKS, stitching together several tools into one coherent workflow:

- **ArgoCD** for GitOps-based deployments. Teams push to a repo, ArgoCD syncs to the cluster. No manual kubectl.
- **Terraform** for all infrastructure provisioning. Company-wide modules so teams get consistent, auditable environments.
- **GitHub Actions** with shared Composite Actions and Reusable Workflows. Teams plug into tested CI templates instead of writing pipelines from scratch.
- **Backstage** as the developer portal. Service catalog, documentation, and self-service tooling in one place.
- **NewRelic** for observability. Standardized dashboards and alerting so teams can debug their own services.

I also maintained the underlying EKS clusters: Karpenter for node scaling, ALB and external-DNS controllers for ingress, self-hosted GitHub runners on EKS for CI workloads.

## How teams use it

A developer onboarding a new service registers it in Backstage, picks from predefined templates, and gets a working repo with CI/CD, infrastructure, and monitoring out of the box. Deployments go through ArgoCD. No tickets, no waiting.

## The result

30+ teams now deploy independently. The infrastructure team went from being a bottleneck to maintaining the platform itself. Deployments that used to require coordination calls now happen without anyone noticing, which is the point.

I wrote company-wide Terraform modules, Helm charts, and GitHub Actions templates that became the standard. Documentation and consultations filled the gaps. When teams hit problems, I'd jump on a call and help them debug, then update the docs so the next team wouldn't hit the same issue.

## Tech stack

AWS EKS, ArgoCD, Terraform, GitHub Actions, Backstage, NewRelic, Helm, Karpenter, ALB Controller, External DNS, External Secrets
