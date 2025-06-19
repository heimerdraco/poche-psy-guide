
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Table } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ActivityExporter = () => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const exportToJson = async () => {
    setIsExporting(true);
    try {
      const { data: activities, error } = await supabase
        .from('activities')
        .select('*')
        .order('target_profiles', { ascending: true })
        .order('day_min', { ascending: true });

      if (error) throw error;

      const jsonData = JSON.stringify(activities, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `arboria-activities-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export réussi",
        description: `${activities?.length || 0} activités exportées en JSON.`,
      });
    } catch (error) {
      console.error('Erreur export JSON:', error);
      toast({
        title: "Erreur d'export",
        description: "Impossible d'exporter les activités.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportToCsv = async () => {
    setIsExporting(true);
    try {
      const { data: activities, error } = await supabase
        .from('activities')
        .select('*')
        .order('target_profiles', { ascending: true })
        .order('day_min', { ascending: true });

      if (error) throw error;

      const csvHeaders = [
        'ID',
        'Titre',
        'Description',
        'Type',
        'Format',
        'Profils cibles',
        'Jour min',
        'Jour max',
        'Premium',
        'Objectif',
        'Instructions',
        'Durée',
        'Matériel',
        'Pourquoi ça aide'
      ];

      const csvRows = activities?.map(activity => {
        const content = typeof activity.content === 'string' 
          ? JSON.parse(activity.content) 
          : activity.content;
        
        return [
          activity.id,
          `"${activity.title}"`,
          `"${activity.description}"`,
          activity.type,
          activity.activity_format,
          `"${activity.target_profiles.join(', ')}"`,
          activity.day_min,
          activity.day_max,
          activity.is_premium ? 'Oui' : 'Non',
          `"${content.objective || ''}"`,
          `"${content.instructions?.join(' | ') || ''}"`,
          `"${content.duration || ''}"`,
          `"${content.material || ''}"`,
          `"${content.why_helps || ''}"`
        ].join(',');
      }) || [];

      const csvContent = [csvHeaders.join(','), ...csvRows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `arboria-activities-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export réussi",
        description: `${activities?.length || 0} activités exportées en CSV.`,
      });
    } catch (error) {
      console.error('Erreur export CSV:', error);
      toast({
        title: "Erreur d'export",
        description: "Impossible d'exporter les activités.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getActivityStats = async () => {
    try {
      const { data: activities, error } = await supabase
        .from('activities')
        .select('target_profiles');

      if (error) throw error;

      const stats = {
        total: activities?.length || 0,
        anxieux: 0,
        fatigue: 0,
        deracine: 0,
        controlant: 0,
        hypersensible: 0,
        refoule: 0,
        volcan: 0,
        partagees: 0
      };

      activities?.forEach(activity => {
        const profiles = activity.target_profiles;
        if (profiles.length > 1) {
          stats.partagees++;
        } else if (profiles.includes('anxieux')) {
          stats.anxieux++;
        } else if (profiles.includes('fatigue')) {
          stats.fatigue++;
        } else if (profiles.includes('deracine')) {
          stats.deracine++;
        } else if (profiles.includes('controlant')) {
          stats.controlant++;
        } else if (profiles.includes('hypersensible')) {
          stats.hypersensible++;
        } else if (profiles.includes('refoule')) {
          stats.refoule++;
        } else if (profiles.includes('volcan')) {
          stats.volcan++;
        }
      });

      return stats;
    } catch (error) {
      console.error('Erreur stats:', error);
      return null;
    }
  };

  const [stats, setStats] = useState<any>(null);

  const loadStats = async () => {
    const activityStats = await getActivityStats();
    setStats(activityStats);
  };

  useState(() => {
    loadStats();
  });

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export des activités
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Statistiques des activités</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div><strong>Total:</strong> {stats.total}</div>
              <div><strong>Anxieux:</strong> {stats.anxieux}</div>
              <div><strong>Fatigué:</strong> {stats.fatigue}</div>
              <div><strong>Déraciné:</strong> {stats.deracine}</div>
              <div><strong>Contrôlant:</strong> {stats.controlant}</div>
              <div><strong>Hypersensible:</strong> {stats.hypersensible}</div>
              <div><strong>Refoulé:</strong> {stats.refoule}</div>
              <div><strong>Volcan:</strong> {stats.volcan}</div>
              <div className="col-span-2"><strong>Partagées:</strong> {stats.partagees}</div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={exportToJson}
            disabled={isExporting}
            className="flex items-center gap-2"
            variant="outline"
          >
            <FileText className="w-4 h-4" />
            {isExporting ? 'Export...' : 'Export JSON'}
          </Button>

          <Button
            onClick={exportToCsv}
            disabled={isExporting}
            className="flex items-center gap-2"
            variant="outline"
          >
            <Table className="w-4 h-4" />
            {isExporting ? 'Export...' : 'Export CSV'}
          </Button>
        </div>

        <p className="text-sm text-gray-600">
          L'export inclut toutes les activités avec leurs détails complets : 
          objectifs, instructions, durées, matériel requis et explications psychologiques.
        </p>
      </CardContent>
    </Card>
  );
};

export default ActivityExporter;
