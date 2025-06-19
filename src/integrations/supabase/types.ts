export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          activity_format: string
          content: Json
          created_at: string
          day_max: number | null
          day_min: number | null
          description: string
          id: string
          is_premium: boolean | null
          target_profiles: string[]
          title: string
          type: string
        }
        Insert: {
          activity_format: string
          content?: Json
          created_at?: string
          day_max?: number | null
          day_min?: number | null
          description: string
          id?: string
          is_premium?: boolean | null
          target_profiles?: string[]
          title: string
          type: string
        }
        Update: {
          activity_format?: string
          content?: Json
          created_at?: string
          day_max?: number | null
          day_min?: number | null
          description?: string
          id?: string
          is_premium?: boolean | null
          target_profiles?: string[]
          title?: string
          type?: string
        }
        Relationships: []
      }
      anonymous_messages: {
        Row: {
          created_at: string
          device_id: string
          id: string
          message: string
          type: string
        }
        Insert: {
          created_at?: string
          device_id: string
          id?: string
          message: string
          type: string
        }
        Update: {
          created_at?: string
          device_id?: string
          id?: string
          message?: string
          type?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          created_at: string
          device_id: string
          id: string
          is_moderated: boolean
          message: string
          profile: string
          pseudonym: string
        }
        Insert: {
          created_at?: string
          device_id: string
          id?: string
          is_moderated?: boolean
          message: string
          profile: string
          pseudonym: string
        }
        Update: {
          created_at?: string
          device_id?: string
          id?: string
          is_moderated?: boolean
          message?: string
          profile?: string
          pseudonym?: string
        }
        Relationships: []
      }
      completed_activities: {
        Row: {
          activity_id: string
          completed_at: string
          device_id: string
          id: string
          notes: string | null
        }
        Insert: {
          activity_id: string
          completed_at?: string
          device_id: string
          id?: string
          notes?: string | null
        }
        Update: {
          activity_id?: string
          completed_at?: string
          device_id?: string
          id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "completed_activities_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_journal: {
        Row: {
          audio_url: string | null
          created_at: string
          date: string
          device_id: string
          id: string
          mood_rating: number | null
          mood_text: string | null
          photo_url: string | null
          written_note: string | null
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          date?: string
          device_id: string
          id?: string
          mood_rating?: number | null
          mood_text?: string | null
          photo_url?: string | null
          written_note?: string | null
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          date?: string
          device_id?: string
          id?: string
          mood_rating?: number | null
          mood_text?: string | null
          photo_url?: string | null
          written_note?: string | null
        }
        Relationships: []
      }
      emotional_profiles: {
        Row: {
          causes: string
          color_theme: string
          created_at: string
          description: string
          id: string
          name: string
          objectives: string
        }
        Insert: {
          causes: string
          color_theme?: string
          created_at?: string
          description: string
          id: string
          name: string
          objectives: string
        }
        Update: {
          causes?: string
          color_theme?: string
          created_at?: string
          description?: string
          id?: string
          name?: string
          objectives?: string
        }
        Relationships: []
      }
      journaling: {
        Row: {
          content: string
          created_at: string
          day: number
          device_id: string
          id: string
          mood: string
        }
        Insert: {
          content: string
          created_at?: string
          day: number
          device_id: string
          id?: string
          mood: string
        }
        Update: {
          content?: string
          created_at?: string
          day?: number
          device_id?: string
          id?: string
          mood?: string
        }
        Relationships: []
      }
      journey_progress: {
        Row: {
          completed_activities: string[] | null
          created_at: string
          current_phase: string
          day_number: number
          device_id: string
          id: string
          updated_at: string
        }
        Insert: {
          completed_activities?: string[] | null
          created_at?: string
          current_phase: string
          day_number?: number
          device_id: string
          id?: string
          updated_at?: string
        }
        Update: {
          completed_activities?: string[] | null
          created_at?: string
          current_phase?: string
          day_number?: number
          device_id?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      moderation_keywords: {
        Row: {
          created_at: string
          id: string
          keyword: string
          severity: string
        }
        Insert: {
          created_at?: string
          id?: string
          keyword: string
          severity?: string
        }
        Update: {
          created_at?: string
          id?: string
          keyword?: string
          severity?: string
        }
        Relationships: []
      }
      questionnaire_answers: {
        Row: {
          answer: string
          created_at: string
          device_id: string
          id: string
          points: Json | null
          question_id: number
        }
        Insert: {
          answer: string
          created_at?: string
          device_id: string
          id?: string
          points?: Json | null
          question_id: number
        }
        Update: {
          answer?: string
          created_at?: string
          device_id?: string
          id?: string
          points?: Json | null
          question_id?: number
        }
        Relationships: []
      }
      reminder_settings: {
        Row: {
          created_at: string
          device_id: string
          enabled: boolean
          id: string
          reminder_time: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          device_id: string
          enabled?: boolean
          id?: string
          reminder_time: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          device_id?: string
          enabled?: boolean
          id?: string
          reminder_time?: string
          updated_at?: string
        }
        Relationships: []
      }
      theme_progress: {
        Row: {
          completed: boolean
          created_at: string
          device_id: string
          id: string
          progress: number
          theme_id: string
          updated_at: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          device_id: string
          id?: string
          progress?: number
          theme_id: string
          updated_at?: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          device_id?: string
          id?: string
          progress?: number
          theme_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_permissions: {
        Row: {
          camera_granted: boolean | null
          device_id: string
          files_granted: boolean | null
          id: string
          microphone_granted: boolean | null
          updated_at: string
        }
        Insert: {
          camera_granted?: boolean | null
          device_id: string
          files_granted?: boolean | null
          id?: string
          microphone_granted?: boolean | null
          updated_at?: string
        }
        Update: {
          camera_granted?: boolean | null
          device_id?: string
          files_granted?: boolean | null
          id?: string
          microphone_granted?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      user_pseudonyms: {
        Row: {
          created_at: string
          device_id: string
          id: string
          profile: string
          pseudonym: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          device_id: string
          id?: string
          profile: string
          pseudonym: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          device_id?: string
          id?: string
          profile?: string
          pseudonym?: string
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          device_id: string
          id: string
          profile: string | null
          trial_start: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          device_id: string
          id?: string
          profile?: string | null
          trial_start?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          device_id?: string
          id?: string
          profile?: string | null
          trial_start?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
