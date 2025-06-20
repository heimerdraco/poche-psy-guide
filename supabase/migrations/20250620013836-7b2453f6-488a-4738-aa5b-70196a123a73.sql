
-- Create yearly_plans table to store fixed 365-day planning for each user
CREATE TABLE public.yearly_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT NOT NULL,
  profile TEXT NOT NULL,
  plan_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(device_id, profile)
);

-- Create day_memories table to store daily activity completion and notes
CREATE TABLE public.day_memories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT NOT NULL,
  day INTEGER NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  completed BOOLEAN NOT NULL DEFAULT false,
  morning_completed BOOLEAN NOT NULL DEFAULT false,
  afternoon_completed BOOLEAN NOT NULL DEFAULT false,
  evening_completed BOOLEAN NOT NULL DEFAULT false,
  morning_notes TEXT,
  afternoon_notes TEXT,
  evening_notes TEXT,
  morning_activity JSONB,
  afternoon_activity JSONB,
  evening_activity JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(device_id, day)
);

-- Add indexes for better performance
CREATE INDEX idx_yearly_plans_device_profile ON public.yearly_plans(device_id, profile);
CREATE INDEX idx_day_memories_device_day ON public.day_memories(device_id, day);
