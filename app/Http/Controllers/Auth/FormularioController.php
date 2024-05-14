<?php

namespace App\Http\Controllers\Auth;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\IOFactory;

class FormularioController extends Controller
{
    public function createPsicologo(): Response
    {
        $this->gerarDocumento();
        return Inertia::render('Welcome');
    }

    public function gerarDocumento($idPaciente, $idPsicologo) // Certifique-se de que o método é público
{
    // Busque o paciente e o psicólogo pelo ID
    $paciente = User::find($idPaciente);
    $psicologo = User::find($idPsicologo);

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
    $objWriter->save(public_path('encaminhamento.docx'));   
}

}
