<template>
  <q-page padding class="bg-grey-2">
    <div class="row q-col-gutter-lg">

      <!-- BARRAS -->
      <div class="col-12 col-md-6">
        <q-card rounded class="shadow-2">
          <q-card-section class="row items-center q-pb-none q-pt-md q-px-md">
            <q-icon name="bar_chart" size="28px" color="primary" class="q-mr-sm" />
            <div class="text-h6 text-weight-bold text-grey-9">Usuários por Tipo</div>
          </q-card-section>
          <q-separator inset class="q-mt-sm q-mb-xs" />
          <q-card-section class="bg-grey-1 q-pa-md rounded-borders">
            <div style="position: relative; height: 320px;">
              <canvas ref="graficoBarras"></canvas>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- LINHA -->
      <div class="col-12 col-md-6">
        <q-card rounded class="shadow-2">
          <q-card-section class="row items-center q-pb-none q-pt-md q-px-md">
            <q-icon name="show_chart" size="28px" color="blue-6" class="q-mr-sm" />
            <div class="text-h6 text-weight-bold text-grey-9">Notas Finalizadas</div>
          </q-card-section>
          <q-separator inset class="q-mt-sm q-mb-xs" />
          <q-card-section class="bg-grey-1 q-pa-md rounded-borders">
            <div style="position: relative; height: 320px;">
              <canvas ref="graficoLinha"></canvas>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- PIZZA -->
      <div class="col-12 col-md-6">
        <q-card rounded class="shadow-2">
          <q-card-section class="row items-center q-pb-none q-pt-md q-px-md">
            <q-icon name="pie_chart" size="28px" color="orange-7" class="q-mr-sm" />
            <div class="text-h6 text-weight-bold text-grey-9">Prioridade das Notas</div>
          </q-card-section>
          <q-separator inset class="q-mt-sm q-mb-xs" />
          <q-card-section class="bg-grey-1 q-pa-md rounded-borders">
            <div style="position: relative; height: 320px;">
              <canvas ref="graficoPizza"></canvas>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- RADAR -->
      <div class="col-12 col-md-6">
        <q-card rounded class="shadow-2">
          <q-card-section class="row items-center q-pb-none q-pt-md q-px-md">
            <q-icon name="donut_large" size="28px" color="green-7" class="q-mr-sm" />
            <div class="text-h6 text-weight-bold text-grey-9">Prioridade x Finalização</div>
          </q-card-section>
          <q-separator inset class="q-mt-sm q-mb-xs" />
          <q-card-section class="bg-grey-1 q-pa-md rounded-borders">
            <div style="position: relative; height: 320px;">
              <canvas ref="graficoRadar"></canvas>
            </div>
          </q-card-section>
        </q-card>
      </div>

    </div>
  </q-page>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Chart from 'chart.js/auto'

import { countTipoUsuario } from '../../services/Usuarios/countTipoUsuarioService';
import { countFinalizadaNota } from '../../services/Notas/countFinazadasNotasService';
import { countPrioridadeNota } from '../../services/Notas/countPrioridadeNotasService';
import { countRadarFinalizadasPrioridades } from '../../services/Notas/countRadarFinalizadasPrioridadesService';

import type { countInterface } from '../../interfaces/countInterface'
import type { countRadarInterface } from '../../interfaces/countRadarInterface'


const graficoBarras = ref<HTMLCanvasElement | null>(null)
const graficoLinha = ref<HTMLCanvasElement | null>(null)
const graficoPizza = ref<HTMLCanvasElement | null>(null)
const graficoRadar = ref<HTMLCanvasElement | null>(null)

// Guarda instâncias para destruir ao desmontar o componente
const chartInstances: Chart[] = []

onMounted(async () => {

  const dadosUsuarios: countInterface[] = await countTipoUsuario();
  const dadosFinalizadas: countInterface[] = await countFinalizadaNota();
  const dadosPrioridade: countInterface[] = await countPrioridadeNota();
  const dadosRadar: countRadarInterface[] = await countRadarFinalizadasPrioridades();


  if (graficoBarras.value) {
    const chart = new Chart(graficoBarras.value, {
      type: 'bar',
      data: {
        labels: dadosUsuarios.map(item => item.tipo),
        datasets: [
          {
            label: 'Quantidade',
            data: dadosUsuarios.map(item => item.quantidade),
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    })
    chartInstances.push(chart)
  }

  /*
    GRÁFICO DE LINHA
  */

  if (graficoLinha.value) {
    const chart = new Chart(graficoLinha.value, {
      type: 'line',
      data: {
        labels: dadosFinalizadas.map(item => String(item.tipo) === 'true' ? 'Feito' : 'Incompleto'),
        datasets: [
          
        {
            label: 'Notas',
            data: dadosFinalizadas.map(item => item.quantidade),
            
            borderColor: '#42A5F5',
            backgroundColor: '#90CAF9',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { left: 6, right: 12 }
        },
        scales: {
          x: {
            offset: true,
            ticks: { padding: 8 }
          },
          y: {
            min: 0,
            suggestedMax: Math.max(...dadosFinalizadas.map(i => i.quantidade)) * 1.4
          }
        }
      }
    })
    chartInstances.push(chart)
  }

  /*
    GRÁFICO PIZZA
  */

if (graficoPizza.value) {
  const chart = new Chart(graficoPizza.value, {
    type: 'pie',
    data: {
      labels: dadosPrioridade.map(item =>
        traduzirPrioridade(String(item.tipo))
      ),

      datasets: [
        {
          data: dadosPrioridade.map(item => item.quantidade),

          backgroundColor: dadosPrioridade.map(item =>
            corPrioridade(String(item.tipo))
          ),

          hoverOffset: 15
        }
      ]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  })

  chartInstances.push(chart)
}
  /*
    GRÁFICO RADAR
  */

  if (graficoRadar.value) {

    const finalizadas = dadosRadar.filter(item => item.tipo2 === true)
    const pendentes = dadosRadar.filter(item => item.tipo2 === false)

    // Labels ORIGINAIS
    const labelsOriginais = [...new Set(dadosRadar.map(item => item.tipo))]

    const chart = new Chart(graficoRadar.value, {
      type: 'radar',

      data: {

        // Apenas visualmente traduzido
        labels: labelsOriginais.map(label => traduzirPrioridade(label)),

        datasets: [
          {
            label: 'Finalizadas',

            // Continua usando os valores originais
            data: labelsOriginais.map(label => {
              const found = finalizadas.find(item => item.tipo === label)
              return found ? Number(found.quantidade) : 0
            }),

            backgroundColor: 'rgba(25, 118, 210, 0.2)',
            borderColor: '#1976D2'
          },

          {
            label: 'Pendentes',

            // Continua usando os valores originais
            data: labelsOriginais.map(label => {
              const found = pendentes.find(item => item.tipo === label)
              return found ? Number(found.quantidade) : 0
            }),

            backgroundColor: 'rgba(239, 83, 80, 0.2)',
            borderColor: '#EF5350'
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
          r: {
            min: 0,
            suggestedMin: 0
          }
        }
      }
    })

    chartInstances.push(chart)
  }

})

// Importante: destrói os gráficos ao sair da página para evitar memory leak
onBeforeUnmount(() => {
  chartInstances.forEach(chart => chart.destroy())
})

function traduzirPrioridade(tipo: string): string {
  const mapa: Record<string, string> = {
    'Vermelho': 'Urgente',
    'Amarelo': 'Atenção',
    'Verde': 'Tranquilo'
  }
  return mapa[tipo] ?? tipo
}

function corPrioridade(tipo: string): string {
  const mapa: Record<string, string> = {
    'Vermelho': '#EF5350',
    'Amarelo': '#FFA726',
    'Verde': '#66BB6A'
  }
  return mapa[tipo] ?? '#90A4AE'
}

</script>