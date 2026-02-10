---
layout: page
title: "Migrating Hundreds of Repos from Bitbucket to GitHub"
permalink: /work/github-migration/
---

The codebase lived in Bitbucket with Bamboo for CI/CD. The company decided to move to GitHub, and my team ran the migration.

## What we were dealing with

Teams deployed to three different targets:

- **ECS** using JavaScript AWS CDK
- **S3 + CloudFront** for static assets
- **API Gateway + Lambda** using Serverless Framework

The CI/CD setup was Bamboo. The previous DevOps team had written pipeline definitions as Java specs -- Bamboo's Java library for defining plans in code. It worked, but it was ugly and hard to maintain. I'd already pushed for moving to Bamboo YAML specs as an improvement, which helped, but the company then decided to go all the way to GitHub Actions.

## Identifying the use cases

My first job was to map out what teams were actually doing in their Bamboo pipelines. I went through the AWS CDK patterns, the Serverless Framework deployments, and the Bamboo specs (both Java and YAML) to identify distinct use cases.

For each use case, I created a GitHub Actions reusable workflow that matched the existing behavior. Teams shouldn't have to rewrite their deployment logic -- they just swap Bamboo for a reusable workflow that does the same thing.

## The migration tool

I designed the migration process and architecture. Team members built the Backstage template and the reusable workflow that handled the actual migration. The result was self-service: a team could trigger their own migration from Backstage. The tool would clone the repo to GitHub with full history, archive the original on Bitbucket, and apply the right CI/CD pipeline based on the use case. It came as a PR so the team could review what changed.

## How it rolled out

It was a rolling migration. We didn't force a deadline or do a big-bang cutover. We acted as a full support line while teams migrated at their own pace.

Around 150 repos went through the full migration with CI/CD pipeline conversion. A few hundred more were migrated as-is because they had no pipeline or didn't fit a standard use case.

The process for a single repo took a few minutes. The longer part was teams testing their CI/CD on all environments and regions. The deployments through GitHub Actions should make no changes to the existing CloudFormation stacks -- it's the same infrastructure, just a different CI tool triggering it. Teams would approve the deployments in GitHub Actions and verify everything matched.

## Self-hosted runners

To support the migration workloads, we started running self-hosted GitHub runners on EKS. This was our first use of EKS at the company. It eventually grew into a full internal developer platform, which I'll write about separately.

## What I built vs. the team

I identified the use cases, created the reusable workflows for each deployment pattern, designed the migration process, and handled the IaC and architecture. Team members built the Backstage migration template and the workflow that executed the actual repo migration. It was a team effort, but the CI/CD patterns and the architecture were mine.

## Tech stack

GitHub Actions, Backstage, Bitbucket, Bamboo, AWS CDK, Serverless Framework, CloudFormation, EKS (self-hosted runners), S3, CloudFront, API Gateway, Lambda

---

<a href="/about/#selected-work" class="btn btn-secondary">&larr; Back to Selected Work</a>
