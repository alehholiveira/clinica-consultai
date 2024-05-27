<?php

namespace App\Http\Controllers\Auth;

use App\Models\Appointment;
use App\Http\Controllers\Controller;
use App\Models\MeetingSession;
use Illuminate\Http\Request;
use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\IOFactory;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;



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

    public function gerarEncaminhamento(Request $request)  // modificar essa funcao para gerar cada um dos arquivos
    {
        $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'meetingsession_id' => 'required|exists:meeting_sessions,id', // adicionar para o request receber informacoes para colocar nos Encaminhamentos e Atestados de atendimento
        ]);

        $meetingSession = MeetingSession::findOrFail($request->meetingsession_id);
        $consulta = Appointment::findOrFail($request->appointment_id);

        $paciente = $consulta->patient;
        $psicologo = $consulta->psychologist;

        // Documento de Encaminhamento
        $phpWord = new PhpWord();
        $section = $phpWord->addSection();

        $section->addImage(base_path('resources/js/assets/Logo.png'), array(
            'width' => 100,
            'height' => 50,
            'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER,
        ));

        $section->addTextBreak(1);

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
            'Eu, Dr(a). ' . $psicologo->name . ', venho por meio deste encaminhar a(o) paciente ' . $paciente->name . ', para avaliação e tratamento psicológico adicional.',
            array('name' => 'Tahoma', 'size' => 12)
        );

        $section->addTextBreak(1);

        $section->addText(
            'Recomenda-se que a paciente passe por uma avaliação detalhada com um especialista, e que sejam consideradas intervenções terapêuticas específicas, como a terapia cognitivo-comportamental (TCC) e, se necessário, o acompanhamento psiquiátrico para avaliação medicamentosa.',
            array('name' => 'Tahoma', 'size' => 12)
        );

        $section->addTextBreak(1);

        $section->addText(
            'Estou à disposição para quaisquer esclarecimentos adicionais.',
            array('name' => 'Tahoma', 'size' => 12)
        );

        $section->addTextBreak(1);

        $section->addText(
            'Atenciosamente,',
            array('name' => 'Tahoma', 'size' => 12)
        );

        $section->addText(
            'Dr(a). ' . $psicologo->name,
            array('name' => 'Tahoma', 'size' => 12)
        );

        $encaminhamentoPath = $this->saveDocument($phpWord, $psicologo, $paciente, $consulta, 'encaminhamento.docx');
        $meetingSession->referrals = $encaminhamentoPath;
        $meetingSession->save();

        return response()->json(['message' => 'Encaminhamento criado com sucesso!', 'meetingsession' => $meetingSession], 201);
    }

    public function gerarAtestado(Request $request)  // modificar essa funcao para gerar cada um dos arquivos
    {
        $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'meetingsession_id' => 'required|exists:meeting_sessions,id', // adicionar para o request receber informacoes para colocar nos Encaminhamentos e Atestados de atendimento
        ]);

        $meetingSession = MeetingSession::findOrFail($request->meetingsession_id);
        $consulta = Appointment::findOrFail($request->appointment_id);

        $paciente = $consulta->patient;
        $psicologo = $consulta->psychologist;

        // Documento de Atestado
        $phpWord = new PhpWord();
        $section = $phpWord->addSection();

        $section->addImage(base_path('resources/js/assets/Logo.png'), array(
            'width' => 100,
            'height' => 50,
            'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER,
        ));

        $section->addTextBreak(1);

        $section->addText(
            'Atestado de Atendimento Psicológico',
            array('name' => 'Tahoma', 'size' => 16, 'bold' => true)
        );

        $section->addTextBreak(1);

        $section->addText(
            'Nome do Paciente: ' . $paciente->name,
            array('name' => 'Tahoma', 'size' => 12)
        );

        $section->addText(
            'Nome do Psicólogo(a): ' . $psicologo->name,
            array('name' => 'Tahoma', 'size' => 12)
        );

        $section->addTextBreak(1);

        $section->addText(
            'Eu, Dr(a). ' . $psicologo->name . ', atesto que o(a) paciente ' . $paciente->name . ', compareceu a uma sessão de atendimento psicológico em meu consultório no dia ' . $consulta->date . '.',
            array('name' => 'Tahoma', 'size' => 12)
        );

        $section->addTextBreak(1);

        $section->addText(
            'Durante a sessão, foi realizada uma avaliação inicial, onde foram discutidos aspectos emocionais, comportamentais e cognitivos da paciente. A avaliação indicou a necessidade de acompanhamento psicológico contínuo para tratar questões relacionadas à ansiedade e ao estresse.',
            array('name' => 'Tahoma', 'size' => 12)
        );

        $section->addTextBreak(1);

        $section->addText(
            'O atendimento ocorreu as ' . $consulta->time . ' horas, e a paciente apresentou-se colaborativa e disposta a seguir com o tratamento proposto.',
            array('name' => 'Tahoma', 'size' => 12)
        );

        $section->addTextBreak(1);

        $section->addText(
            'Este atestado é emitido para os devidos fins que se fizerem necessários.',
            array('name' => 'Tahoma', 'size' => 12)
        );

        $section->addTextBreak(1);

        $section->addText(
            'Atenciosamente,',
            array('name' => 'Tahoma', 'size' => 12)
        );

        $section->addText(
            'Dr(a). ' . $psicologo->name,
            array('name' => 'Tahoma', 'size' => 12)
        );


        $atestadoPath = $this->saveDocument($phpWord, $psicologo, $paciente, $consulta, 'atestado.docx');
        $meetingSession->attendance_certificates = $atestadoPath;
        $meetingSession->save();

        return response()->json(['message' => 'Atestado gerado com sucesso!', 'meetingsession' => $meetingSession], 201);
    }

    public function gerarInfo(Request $request)  // modificar essa funcao para gerar cada um dos arquivos
    {
        $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'meetingsession_id' => 'required|exists:meeting_sessions,id', // adicionar para o request receber informacoes para colocar nos Encaminhamentos e Atestados de atendimento
            'meetinginfo' => 'required|string'
        ]);

        $meetingSession = MeetingSession::findOrFail($request->meetingsession_id);
        $consulta = Appointment::findOrFail($request->appointment_id);

        $paciente = $consulta->patient;
        $psicologo = $consulta->psychologist;

        // Documento de Meeting Info
        $phpWord = new PhpWord();
        $section = $phpWord->addSection();

        $section->addImage(base_path('resources/js/assets/Logo.png'), array(
            'width' => 100,
            'height' => 50,
            'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER,
        ));

        $section->addTextBreak(1);

        $section->addText(
            'Informações sobre a consulta',
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
            'Descrição: '. $request->meetinginfo .'.',
            array('name' => 'Tahoma', 'size' => 12)
        );

        $section->addTextBreak(1);

        $section->addText(
            'Dr(a). ' . $psicologo->name,
            array('name' => 'Tahoma', 'size' => 12)
        );

        $encaminhamentoPath = $this->saveDocument($phpWord, $psicologo, $paciente, $consulta, 'info.docx');
        $meetingSession->meeting_annotation = $encaminhamentoPath;
        $meetingSession->save();

        return response()->json(['message' => 'Informações sobre a consulta criada com sucesso!', 'meetingsession' => $meetingSession], 201);
    }

    private function saveDocument($phpWord, $psicologo, $paciente, $consulta, $filename)
    {
        $objWriter = IOFactory::createWriter($phpWord, 'Word2007');
        $path = './storage/storage/public/' . $psicologo->name . '/' . $paciente->name . '/' . $consulta->date;
        if (!File::exists(storage_path($path))) {
            File::makeDirectory(storage_path($path), 0777, true);
        }
        $fullPath = $path . '/' . $filename;
        $objWriter->save(storage_path($fullPath));
        return $fullPath;
    }
}
