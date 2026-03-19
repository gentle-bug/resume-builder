-- CV Builder Pro - Database Initialization Script
-- PostgreSQL 17

-- Create database (run this separately if needed)
-- CREATE DATABASE cv_builder_db;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Resumes table
CREATE TABLE IF NOT EXISTS resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    template_name VARCHAR(100) NOT NULL DEFAULT 'modern',
    data JSONB DEFAULT '{}',
    avatar BYTEA,
    avatar_type VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_slug ON resumes(slug);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- GIN index for JSONB search (future use)
CREATE INDEX IF NOT EXISTS idx_resumes_data ON resumes USING GIN(data);
