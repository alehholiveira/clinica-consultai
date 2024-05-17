<?php

namespace App\Http\Controllers\Auth;

use App\Models\Appointment;
use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\MeetingSession;
use Illuminate\Http\Request;
use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\IOFactory;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;



class MeetingSessionController extends Controller
{
    public function create($user_name, $appointment_id): Response
    {
        $auth = Auth::user();

        if ($auth->role == 'psicologo') {
            $meetingSession = MeetingSession::where('appointment_id', $appointment_id)->first();
            $appointment = Appointment::find($appointment_id);
            return Inertia::render('Auth/MeetingSession', [
                'meetingsession' => $meetingSession,
                'appointment' => $appointment
            ]);
        } else {
            abort(403, 'Acesso negado');
        }
    }

    public function createMeetingSession(Request $request)  
    {
        $request->validate([
            'appointment_id' => 'required|exists:appointments,id', // adicionar para o request receber informacoes para colocar nos Encaminhamentos e Atestados de atendimento
        ]);

        $consulta = Appointment::find($request->appointment_id);

        $meetingSession = MeetingSession::create([
            'appointment_id' => $consulta->id,
        ]);

        return redirect(route('dashboard', absolute: false));
    }

    public function store2(Request $request)  // modificar essa funcao para gerar cada um dos arquivos
    {
        $request->validate([
            'meetingsession_id' => 'required|exists:meeting_sessions,id', // adicionar para o request receber informacoes para colocar nos Encaminhamentos e Atestados de atendimento
        ]);

        $meetingSession = MeetingSession::find($request->meetingsession_id);

        $consulta = Appointment::find($request->meetingsession_id);

        $paciente = $consulta->patient;
        $psicologo = $consulta->psychologist;

        $phpWord = new PhpWord();

        // Adiciona uma nova seção ao documento
        $section = $phpWord->addSection();

        // Adiciona texto à seção
        $section->addText(
            'Encaminhamento Psicológico',
            array('name' => 'Tahoma', 'size' => 16, 'bold' => true)
        );

        $section->addTextBreak(1);

        $section->addText(
            'Nome do Paciente: ' . $paciente->name,
            array('name' => 'Tahoma', 'size' => 12)
        );

        $section->addText(
            'Nome do Psicólogo: ' . $psicologo->name,
            array('name' => 'Tahoma', 'size' => 12)
        );

        $section->addTextBreak(1);

        $section->addText(
            'Estou encaminhando o paciente acima para avaliação e tratamento psicológico adicional. Acredito que o paciente se beneficiará do tratamento psicológico para ajudar a lidar com os desafios emocionais e comportamentais que está enfrentando atualmente.',
            array('name' => 'Tahoma', 'size' => 12)
        );

        $section->addTextBreak(1);

        $section->addText(
            'Atenciosamente,',
            array('name' => 'Tahoma', 'size' => 12)
        );

        $section->addText(
            $psicologo->name,
            array('name' => 'Tahoma', 'size' => 12)
        );

        // Salva o documento como um arquivo docx na pasta public
        $objWriter = IOFactory::createWriter($phpWord, 'Word2007');

        // Cria as pastas necessárias
        $path = './storage/storage/public/' . $psicologo->name . '/' . $paciente->name . '/' . $consulta->date;
        if (!File::exists(storage_path($path))) {
            File::makeDirectory(storage_path($path), 0777, true);
        }

        // Salva o arquivo na pasta criada
        $encaminhamentoPath = $path . '/encaminhamento.docx';
        $objWriter->save(storage_path($encaminhamentoPath));

        $meetingSession->referrals = $encaminhamentoPath;
        $meetingSession->attendance_certificates = $encaminhamentoPath;
        $meetingSession->save();

        return response()->json(['message' => 'Consulta criada com sucesso!', 'meetingsession' => $meetingSession], 201);
    }

    private function getMeeting($appointment_id) 
    {
        return MeetingSession::where('appointment_id', $appointment_id)->first();
    }
}
