#!/usr/bin/env python3
"""Generate resume PDFs from structured content. Run: .venv/bin/python scripts/generate_resumes.py"""

from __future__ import annotations

import shutil
from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parent.parent


class ResumePDF(FPDF):
    def ensure_space(self, height: float = 12) -> None:
        if self.get_y() + height > self.h - self.b_margin:
            self.add_page()
        self.set_x(self.l_margin)

    def header_block(self, contact: str) -> None:
        self.set_font("Helvetica", "B", 16)
        self.cell(0, 8, "Mahababur Rahman", new_x="LMARGIN", new_y="NEXT")
        self.set_font("Helvetica", "", 8)
        self.multi_cell(0, 4, contact)
        self.ln(3)

    def section(self, title: str) -> None:
        self.ensure_space(10)
        self.set_font("Helvetica", "B", 9)
        self.cell(0, 6, title.upper(), new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(0, 0, 0)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(2)

    def body(self, text: str, size: int = 8, bold: bool = False) -> None:
        self.ensure_space(8)
        style = "B" if bold else ""
        self.set_font("Helvetica", style, size)
        self.multi_cell(0, 3.8, text)
        self.ln(1)

    def bullets(self, items: list[str]) -> None:
        self.set_font("Helvetica", "", 8)
        for item in items:
            self.ensure_space(6)
            self.multi_cell(0, 3.8, f"- {item}")
        self.ln(1)


CONTACT = (
    "+880 1745010925  |  mahababurrahaman2014@gmail.com  |  "
    "linkedin.com/in/mahababur-rahaman  |  codebymamun.me  |  "
    "github.com/mamun792  |  Dhaka, Bangladesh"
)


def build_backend() -> FPDF:
    pdf = ResumePDF()
    pdf.set_auto_page_break(auto=True, margin=12)
    pdf.add_page()
    pdf.header_block(CONTACT)

    pdf.section("Profile")
    pdf.body(
        "Backend Developer with 2 years of professional experience building and maintaining "
        "production Laravel applications. Strong command of PHP OOP and SOLID principles, RESTful "
        "API design, relational database optimisation with PostgreSQL and MySQL, Redis caching "
        "and queue management, and Docker-based deployment. Experienced in designing backend "
        "systems that handle concurrent traffic across multi-vendor and multi-tenant platforms. "
        "Eager to apply backend engineering skills to location-based and geospatial services."
    )

    pdf.section("Technical Skills")
    for line in [
        "Backend: PHP 8.x, Laravel 11, Eloquent ORM, Migrations, Queues, Java 17, Spring Boot 3.x",
        "Database: PostgreSQL, MySQL, MongoDB, Redis, ProxySQL, Query Optimisation, Indexing",
        "Geospatial: PostgreSQL PostGIS (familiar), Tile38 (learning), location-based query design",
        "DevOps: Docker, Nginx, GitHub Actions CI/CD, Linux Ubuntu VPS",
        "Architecture: Clean Architecture, Repository Pattern, Service Layer, CQRS, DDD, SOLID",
        "Auth and RBAC: Laravel Policies, Gates, Spatie Permission, JWT, Role-Based Access Control",
        "Frontend: Next.js 15, Vue.js 3, JavaScript ES6+, jQuery",
        "Testing: PHPUnit Unit and Feature Testing, TDD",
        "Integrations: bKash, Nagad, SSLCommerz, Stripe, PayPal, Pathao, Steadfast Courier APIs",
    ]:
        pdf.body(line)

    pdf.section("Professional Experience")
    pdf.body("Software Engineer - Auxtech Limited (Jul 2024 - Present)", bold=True)
    pdf.bullets([
        "Developed and maintained 3 concurrent production Laravel 11 platforms: MVE marketplace, SASA multi-tenant SaaS, and E7 LMS; REST APIs for web and mobile under continuous traffic.",
        "Designed and optimised MySQL/PostgreSQL schemas via composite indexing, slow query analysis, eager loading, and ProxySQL read-write splitting; sustained 3x concurrent load.",
        "Configured Redis Cache-Aside with mutex locks and Laravel Queue/Horizon for async emails, PDFs, and notifications; reduced API response time 40% (800ms to 480ms).",
        "Built geolocation-aware shipping for all 64 Bangladesh districts; integrated Pathao and Steadfast courier APIs with webhooks and real-time tracking.",
        "Architected RBAC with Laravel Policies, Gates, and Spatie Permission supporting 5+ roles per platform.",
        "Integrated 6 payment gateways and 2 courier APIs with webhook handling, signature verification, and automated retry logic.",
        "Managed Ubuntu VPS with Nginx, Docker, and GitHub Actions zero-downtime CI/CD deployments.",
        "Collaborated with Next.js 15 and Vue.js 3 teams; maintained PHPUnit unit and feature test suites.",
    ])
    pdf.body("Software Developer Intern, Java Backend - Pro Info Sys BD (Jun 2023 - Dec 2023)", bold=True)
    pdf.bullets([
        "Developed enterprise banking modules with Java Spring Boot: transactions, accounts, financial reporting.",
        "Resolved 50+ production defects; improved slow MySQL queries via indexing and restructuring.",
        "Achieved 80%+ unit test coverage with JUnit 5 and Mockito using TDD.",
    ])

    pdf.section("Featured Projects")
    pdf.body("MVE - Multi-Vendor E-commerce Marketplace (Laravel 11, PostgreSQL, MySQL, Redis, Vue.js 3)", bold=True)
    pdf.body(
        "Production marketplace with vendor onboarding, 3-level commission engine, order/inventory management, "
        "and district-aware shipping for 64 districts. 4 payment gateways and 2 courier APIs with webhook retry logic."
    )
    pdf.body("SASA - Multi-Tenant SaaS Platform (Laravel 11, PostgreSQL, Redis, Docker)", bold=True)
    pdf.body(
        "Multi-tenant backend with Clean Architecture, CQRS, Domain Events, Redis mutex cache stampede prevention, "
        "and per-tenant Global Scopes. Tenant provisioning under 5 seconds via Laravel Jobs."
    )
    pdf.body("E7 LMS - Learning Management System (Laravel 11, MySQL, Redis)", bold=True)
    pdf.body(
        "LMS with course management, 3-role access control (Admin, Instructor, Student), enrolment workflows, "
        "and student progress tracking."
    )

    pdf.section("Education")
    pdf.body(
        "Bachelor of Science in Computer Science, Green University of Bangladesh (2019-2023), CGPA 3.13/4.00\n"
        "Relevant Coursework: DSA, OOP, Database Systems, Software Engineering, Web Development"
    )

    pdf.section("Achievements")
    pdf.bullets([
        "LeetCode: 150+ algorithmic problems (DSA, dynamic programming).",
        "HackerRank: 5-star SQL, 4-star Problem Solving, 4-star Java.",
        "Self-taught Docker, Redis, PostgreSQL, CI/CD, and system design alongside full-time work.",
        "Languages: Bengali (Native), English (Professional).",
    ])
    return pdf


def build_java() -> FPDF:
    pdf = ResumePDF()
    pdf.set_auto_page_break(auto=True, margin=12)
    pdf.add_page()
    pdf.header_block(CONTACT)

    pdf.section("Profile")
    pdf.body(
        "Software Engineer with hands-on Java Spring Boot experience through enterprise internship and "
        "independent projects. Solid understanding of Core Java, Spring ecosystem, OOP, SOLID, RESTful APIs, "
        "relational databases, and JUnit 5/Mockito testing. Experienced in clean architecture, JWT security, "
        "RBAC, and TDD. Currently building high-traffic production platforms across PHP and Java stacks. "
        "Eager to join a microservices and Spring-focused team."
    )

    pdf.section("Technical Skills")
    for line in [
        "Language: Java 17/21, Core Java, PHP 8.x, JavaScript, Groovy (familiar), JSON",
        "Framework: Spring Boot 3.x, Spring MVC, Spring Security, Spring Data JPA, Hibernate, Laravel 11",
        "Database: PostgreSQL, MySQL, SQL Server, Redis, ProxySQL, JPA/JDBC",
        "Testing: JUnit 5, Mockito, Spring Boot Test, PHPUnit, TDD",
        "Security: JWT, Spring Security, RBAC, Laravel Policies and Gates",
        "Tools: IntelliJ IDEA, Maven, Postman, Tomcat, Git, GitHub",
        "DevOps: Docker, Nginx, GitHub Actions CI/CD, Linux Ubuntu VPS",
        "Architecture: Microservices (familiar), Clean Architecture, SOLID, Repository Pattern, CQRS, DDD",
    ]:
        pdf.body(line)

    pdf.section("Professional Experience")
    pdf.body("Software Engineer - Auxtech Limited (Jul 2024 - Present)", bold=True)
    pdf.bullets([
        "Maintaining 3 production platforms with Clean Architecture, Repository Pattern, Service Layer, and SOLID.",
        "RESTful APIs with JWT auth and RBAC; versioned contracts for web and mobile clients.",
        "Redis caching and async queues; 40% API latency reduction (800ms to 480ms).",
        "Database performance via composite indexing, slow query analysis, eager loading, read-write splitting; 3x traffic.",
        "PHPUnit tests with TDD; code reviews and Agile collaboration with frontend/mobile teams.",
        "Docker containerisation and GitHub Actions CI/CD to Ubuntu VPS production.",
    ])
    pdf.body("Software Developer Intern, Java Backend - Pro Info Sys BD (Jun 2023 - Dec 2023)", bold=True)
    pdf.bullets([
        "Enterprise banking with Java 17 and Spring Boot 3.x: transactions, accounts, financial reporting.",
        "REST APIs handling 10,000+ daily transactions with Spring Data JPA and MySQL.",
        "Resolved 50+ defects; 30% query execution time reduction via indexing and restructuring.",
        "80%+ unit test coverage with JUnit 5 and Mockito (TDD).",
        "Code reviews with senior engineers on enterprise Java and Spring Boot patterns.",
    ])

    pdf.section("Java Projects")
    pdf.body("LeaveManager - Enterprise Leave Management (Java 17, Spring Boot 3.x, Spring Security, MySQL)", bold=True)
    pdf.body(
        "github.com/mamun792/LeaveApplication_Api - Multi-level leave approval for 500+ employees. "
        "Spring Security RBAC (Admin, Manager, Employee), JWT auth, Spring Mail notifications, "
        "audit logging via Spring AOP."
    )
    pdf.body("QuizApp - Interactive Assessment Platform (Java 17, Spring Boot, Spring MVC, PostgreSQL)", bold=True)
    pdf.body(
        "github.com/mamun792/quizApp - Spring MVC + Thymeleaf quiz app with CRUD, automatic grading, "
        "real-time results, and analytics dashboard via Spring Data JPA."
    )

    pdf.section("Education")
    pdf.body(
        "Bachelor of Science in Computer Science, Green University of Bangladesh (2019-2023), CGPA 3.13/4.00\n"
        "Relevant Coursework: DSA, OOP (Java), Database Systems, Software Engineering, Web Technologies"
    )

    pdf.section("Achievements")
    pdf.bullets([
        "LeetCode: 150+ problems (DSA, algorithms, dynamic programming).",
        "HackerRank: 5-star SQL, 4-star Java, 4-star Problem Solving.",
        "Studying Spring Cloud, Apache Kafka, and Kubernetes for distributed systems.",
        "Languages: Bengali (Native), English (Professional).",
    ])
    return pdf


def main() -> None:
    backend_path = ROOT / "resume-backend.pdf"
    java_path = ROOT / "resume-java.pdf"
    legacy_path = ROOT / "resume.pdf"

    build_backend().output(str(backend_path))
    build_java().output(str(java_path))
    shutil.copy2(backend_path, legacy_path)

    print(f"Wrote {backend_path.name}")
    print(f"Wrote {java_path.name}")
    print(f"Synced {legacy_path.name} from backend resume")


if __name__ == "__main__":
    main()
