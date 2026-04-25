
-- Drop old FK to auth.users
ALTER TABLE public.questions DROP CONSTRAINT questions_user_id_fkey;

-- Add FK from questions.user_id to profiles.user_id
ALTER TABLE public.questions
  ADD CONSTRAINT questions_user_id_profiles_fkey
  FOREIGN KEY (user_id) REFERENCES public.profiles(user_id);

-- Add FK from replies.user_id to profiles.user_id  
ALTER TABLE public.replies
  ADD CONSTRAINT replies_user_id_profiles_fkey
  FOREIGN KEY (user_id) REFERENCES public.profiles(user_id);
