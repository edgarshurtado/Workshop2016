<?php

namespace TestBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

use Assetic\AssetManager;
use Assetic\Asset\FileAsset;
use Assetic\Asset\AssetCollection;
use Assetic\Filter\ScssphpFilter;
use Assetic\AssetWriter;

class DefaultController extends Controller
{

    /**
    * @Route("\", name="algo")
    */
    public function indexAction()
    {
        return $this->render("test/test1.html.twig");
    }

    /**
     * @Route("/dump", name="dump")
     */
    public function dump()
    {

        $js = new AssetCollection(array(
            new FileAsset( __DIR__ . "\..\Resources\public\sass\main.scss"),
        ), array(
            new ScssphpFilter()
        ));

        echo $js->dump(); exit();
    }

    /**
     * @Route("/tofile", name="file")
     */
    public function file()
    {

        $arrayCss = [__DIR__ . "\..\Resources\public\sass\main.scss"];

        $arrayFileAssets = array();

        foreach ($arrayCss as $asset) {
            $arrayFileAssets[] = new FileAsset($asset);
        }

        //Configuración del filtro
        $scssFilter = new ScssphpFilter();
        $scssFilter->setFormatter(
            'scss_formatter_compressed' //Formateador que complia y comprime
        );

        //Creación de la colección de assets con sus filtros
        $css = new AssetCollection( $arrayFileAssets, array($scssFilter));

        // Configuración del nombre para el archivo de salida
        $css->setTargetPath("main-min.css");

        // Creación de asset manager y asignación de la AssetCollection
        // el assetManages es necesario para utilizar AssetWriter
        $am = new AssetManager();
        $am->set('scss', $css);

        // Ruta a la carpeta web
        $webFolderRoute = $this->get('kernel')->getRootDir() . '/../web';

        // Configuración y ejecución del AssetWriter
        $writer = new AssetWriter($webFolderRoute . "/css");
        $writer->writeManagerAssets($am);

        return "Hello";
    }
}

