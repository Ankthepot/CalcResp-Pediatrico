import React, { useState, useEffect } from 'react';
    import './App.css';

    function App() {
      const [paciente, setPaciente] = useState({
        idade: '',
        peso: '',
        altura: '',
      });

      const [broselow, setBroselow] = useState('');
      const [pesoEstimado, setPesoEstimado] = useState('');

      const [resultados, setResultados] = useState({
        vt: '',
        fr: '',
        cpap: '',
        mpap: '',
        altoFluxo: '',
        respirador: '',
        resuscitationBag: '',
        o2Mask: '',
        oralAirway: '',
        laryngoscopeBlade: '',
        trachealTubeMM: '',
        trachealTubeLength: '',
        stylet: '',
        suctionCatheter: '',
        bpCuff: '',
        ivCatheter: '',
        butterfly: '',
        nasogastricTube: '',
        urinaryCatheter: '',
        defibrillationPaddles: '',
        chestTube: '',
      });

      const [alertas, setAlertas] = useState([]);

      const coresBroselow = {
        Vermelho: {
          peso: '3-5 kg',
          resuscitationBag: 'Infantil',
          o2Mask: 'Recém-nascido',
          oralAirway: 'Infantil/Criança pequena',
          laryngoscopeBlade: '0-1 reta',
          trachealTubeMM: 'Prematuro infantil 2.5',
          trachealTubeLength: '10-10.5',
          stylet: 6,
          suctionCatheter: '6-8',
          bpCuff: 'Recém-nascido/Infantil',
          ivCatheter: '22-24',
          butterfly: '23-25',
          nasogastricTube: '5-8',
          urinaryCatheter: '5-8',
          defibrillationPaddles: 'Pás infantis',
          chestTube: '10-12',
        },
        Rosa: {
          peso: '6-9 kg',
          resuscitationBag: 'Criança',
          o2Mask: 'Recém-nascido',
          oralAirway: 'Infantil/Criança pequena',
          laryngoscopeBlade: '1 reta',
          trachealTubeMM: '3.5 sem cuff',
          trachealTubeLength: '10-10.5',
          stylet: 6,
          suctionCatheter: 8,
          bpCuff: 'Recém-nascido/Infantil',
          ivCatheter: '22-24',
          butterfly: '23-25',
          nasogastricTube: '5-8',
          urinaryCatheter: '5-8',
          defibrillationPaddles: 'Pás infantis até 1 ano ou 10 kg',
          chestTube: '10-12',
        },
        Roxo: {
          peso: '10-11 kg',
          resuscitationBag: 'Criança',
          o2Mask: 'Pediátrica',
          oralAirway: 'Criança pequena',
          laryngoscopeBlade: '1 reta',
          trachealTubeMM: '4.0 sem cuff',
          trachealTubeLength: '11-12',
          stylet: 6,
          suctionCatheter: '8-10',
          bpCuff: 'Infantil/Criança',
          ivCatheter: '20-24',
          butterfly: '23-25',
          nasogastricTube: '8-10',
          urinaryCatheter: '8-10',
          defibrillationPaddles: 'Pás de adulto quando ≥1 ano ou ≥10 kg',
          chestTube: '16-20',
        },
        Amarelo: {
          peso: '12-14 kg',
          resuscitationBag: 'Criança',
          o2Mask: 'Pediátrica',
          oralAirway: 'Criança',
          laryngoscopeBlade: '2 reta',
          trachealTubeMM: '4.5 sem cuff',
          trachealTubeLength: '12.5-13.5',
          stylet: 6,
          suctionCatheter: 10,
          bpCuff: 'Criança',
          ivCatheter: '18-22',
          butterfly: '21-23',
          nasogastricTube: 10,
          urinaryCatheter: '10-12',
          defibrillationPaddles: 'Pás de adulto',
          chestTube: '20-24',
        },
        Verde: {
          peso: '28-30 kg',
          resuscitationBag: 'Criança/adulto',
          o2Mask: 'Criança/adulto',
          oralAirway: 'Criança/adulto pequeno',
          laryngoscopeBlade: '2-3 reta ou curva',
          trachealTubeMM: '6.0 com cuff',
          trachealTubeLength: '17-18',
          stylet: 14,
          suctionCatheter: 10,
          bpCuff: 'Criança/adulto',
          ivCatheter: '18-20',
          butterfly: '18-20',
          nasogastricTube: '14-18',
          urinaryCatheter: 12,
          defibrillationPaddles: 'Pás de adulto',
          chestTube: '28-32',
        },
        Branco: {
          peso: '≥32 kg',
          resuscitationBag: 'Adulto',
          o2Mask: 'Adulto',
          oralAirway: 'Adulto médio',
          laryngoscopeBlade: '3 reta ou curva',
          trachealTubeMM: '6.5 com cuff',
          trachealTubeLength: '18.5-19.5',
          stylet: 14,
          suctionCatheter: 12,
          bpCuff: 'Adulto',
          ivCatheter: '16-20',
          butterfly: '18-21',
          nasogastricTube: 18,
          urinaryCatheter: 12,
          defibrillationPaddles: 'Pás de adulto',
          chestTube: '32-40',
        },
      };

      useEffect(() => {
        const cachedResultados = localStorage.getItem('resultados');
        if (cachedResultados) {
          setResultados(JSON.parse(cachedResultados));
        }
      }, []);

      const handleBroselowChange = (e) => {
        const corSelecionada = e.target.value;
        setBroselow(corSelecionada);
        setPesoEstimado(coresBroselow[corSelecionada]?.peso || '');

        if (corSelecionada) {
          const {
            resuscitationBag,
            o2Mask,
            oralAirway,
            laryngoscopeBlade,
            trachealTubeMM,
            trachealTubeLength,
            stylet,
            suctionCatheter,
            bpCuff,
            ivCatheter,
            butterfly,
            nasogastricTube,
            urinaryCatheter,
            defibrillationPaddles,
            chestTube,
          } = coresBroselow[corSelecionada];

          setResultados({
            ...resultados,
            resuscitationBag,
            o2Mask,
            oralAirway,
            laryngoscopeBlade,
            trachealTubeMM,
            trachealTubeLength,
            stylet,
            suctionCatheter,
            bpCuff,
            ivCatheter,
            butterfly,
            nasogastricTube,
            urinaryCatheter,
            defibrillationPaddles,
            chestTube,
          });
        } else {
          setResultados({
            ...resultados,
            resuscitationBag: '',
            o2Mask: '',
            oralAirway: '',
            laryngoscopeBlade: '',
            trachealTubeMM: '',
            trachealTubeLength: '',
            stylet: '',
            suctionCatheter: '',
            bpCuff: '',
            ivCatheter: '',
            butterfly: '',
            nasogastricTube: '',
            urinaryCatheter: '',
            defibrillationPaddles: '',
            chestTube: '',
          });
        }
      };

      const calcularVT = (peso) => {
        const vtMin = peso * 6;
        const vtMax = peso * 8;
        return `VT: ${vtMin}-${vtMax} mL`;
      };

      const calcularFR = (idade) => {
        let fr;
        if (idade < 1) {
          fr = '30-60 rpm';
        } else if (idade >= 1 && idade < 6) {
          fr = '20-30 rpm';
        } else {
          fr = '12-20 rpm';
        }
        return `FR: ${fr}`;
      };

      const calcularCPAP = () => {
        return 'CPAP: 5-8 cmH2O';
      };

      const calcularMPAPAltoFluxo = (peso, broselow) => {
        let fio2 = '21%';
        let fluxo = '2 L/min';

        if (peso > 10 && broselow === 'Amarelo') {
          fio2 = '30%';
          fluxo = '3 L/min';
        }

        return {
          mpap: `MPAP: FiO2 ${fio2}`,
          altoFluxo: `Alto Fluxo: ${fluxo}`,
        };
      };

      const calcularRespirador = (peso) => {
        const peep = '5 cmH2O';
        const pressaoInspiratoria = '15 cmH2O';
        return `Respirador: PEEP ${peep}, Pressão Inspiratória ${pressaoInspiratoria}`;
      };

      const calcular = () => {
        let { idade, peso, altura } = paciente;
        const novosAlertas = [];

        if (!broselow && (!idade || !peso)) {
          novosAlertas.push('Idade e peso são obrigatórios a menos que a cor da fita de Broselow seja selecionada.');
          setAlertas(novosAlertas);
          return;
        }

        if (broselow) {
          peso = coresBroselow[broselow]?.peso;
          idade = coresBroselow[broselow]?.idade;
        }

        peso = parseFloat(peso);
        idade = parseFloat(idade);

        const vt = calcularVT(peso);
        const fr = calcularFR(idade);
        const cpap = calcularCPAP();
        const { mpap, altoFluxo } = calcularMPAPAltoFluxo(peso, broselow);
        const respirador = calcularRespirador(peso);

        const novosResultados = {
          ...resultados,
          vt,
          fr,
          cpap,
          mpap,
          altoFluxo,
          respirador,
        };

        setResultados(novosResultados);
        localStorage.setItem('resultados', JSON.stringify(novosResultados));

        setAlertas(novosAlertas);
      };

      return (
        <div className="app-container">
          <h1>CalcResp Pediátrico</h1>
          <form className="form-container">
            <label>
              Idade (anos):
              <input
                type="number"
                value={paciente.idade}
                onChange={(e) => setPaciente({ ...paciente, idade: e.target.value })}
                disabled={broselow !== ''}
              />
            </label>
            <br />
            <label>
              Peso (kg):
              <input
                type="number"
                value={paciente.peso}
                onChange={(e) => setPaciente({ ...paciente, peso: e.target.value })}
                disabled={broselow !== ''}
              />
            </label>
            <br />
            <label>
              Altura (cm):
              <input
                type="number"
                value={paciente.altura}
                onChange={(e) => setPaciente({ ...paciente, altura: e.target.value })}
                disabled={broselow !== ''}
              />
            </label>
            <br />
            <label>
              Selecione a cor da Fita de Broselow:
              <select value={broselow} onChange={handleBroselowChange}>
                <option value="">Selecione</option>
                <option value="Vermelho">Vermelho (3-5 kg)</option>
                <option value="Rosa">Rosa (6-9 kg)</option>
                <option value="Roxo">Roxo (10-11 kg)</option>
                <option value="Amarelo">Amarelo (12-14 kg)</option>
                <option value="Azul">Azul (19-22 kg)</option>
                <option value="Verde">Verde (28-30 kg)</option>
                <option value="Branco">Branco (≥32 kg)</option>
              </select>
            </label>
            {pesoEstimado && <p>Peso estimado: {pesoEstimado}</p>}
            <br />
            <button type="button" onClick={calcular}>
              Calcular
            </button>
          </form>

          {alertas.length > 0 && (
            <div className="alert-container">
              <h2>Alertas</h2>
              <ul>
                {alertas.map((alerta, index) => (
                  <li key={index}>{alerta}</li>
                ))}
              </ul>
            </div>
          )}

          {broselow && (
            <div className="broselow-data">
              <h2>Dados da Fita de Broselow ({broselow})</h2>
              <table>
                <thead>
                  <tr>
                    <th>Equipamento</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Peso Estimado</td>
                    <td>{coresBroselow[broselow].peso}</td>
                  </tr>
                  <tr>
                    <td>Bolsa de Ressuscitação</td>
                    <td>{resultados.resuscitationBag}</td>
                  </tr>
                  <tr>
                    <td>Máscara de O₂</td>
                    <td>{resultados.o2Mask}</td>
                  </tr>
                  <tr>
                    <td>Via Aérea Oral</td>
                    <td>{resultados.oralAirway}</td>
                  </tr>
                  <tr>
                    <td>Lâmina do Laringoscópio</td>
                    <td>{resultados.laryngoscopeBlade}</td>
                  </tr>
                  <tr>
                    <td>Tubo Traqueal (mm)</td>
                    <td>{resultados.trachealTubeMM}</td>
                  </tr>
                  <tr>
                    <td>Comprimento do Tubo Traqueal (cm no lábio)</td>
                    <td>{resultados.trachealTubeLength}</td>
                  </tr>
                  <tr>
                    <td>Estilete (F)</td>
                    <td>{resultados.stylet}</td>
                  </tr>
                  <tr>
                    <td>Cateter de Sucção (F)</td>
                    <td>{resultados.suctionCatheter}</td>
                  </tr>
                  <tr>
                    <td>Manguito de PA</td>
                    <td>{resultados.bpCuff}</td>
                  </tr>
                  <tr>
                    <td>Cateter IV (G)</td>
                    <td>{resultados.ivCatheter}</td>
                  </tr>
                  <tr>
                    <td>Butterfly (G)</td>
                    <td>{resultados.butterfly}</td>
                  </tr>
                  <tr>
                    <td>Tubo Nasogástrico (F)</td>
                    <td>{resultados.nasogastricTube}</td>
                  </tr>
                  <tr>
                    <td>Cateter Urinário (F)</td>
                    <td>{resultados.urinaryCatheter}</td>
                  </tr>
                  <tr>
                    <td>Pás de Desfibrilação/Cardioversão Externas</td>
                    <td>{resultados.defibrillationPaddles}</td>
                  </tr>
                  <tr>
                    <td>Tubo Torácico (F)</td>
                    <td>{resultados.chestTube}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="resultados-container">
            <h2>Resultados</h2>
            <p>{resultados.vt}</p>
            <p>{resultados.fr}</p>
            <p>{resultados.cpap}</p>
            <p>{resultados.mpap}</p>
            <p>{resultados.altoFluxo}</p>
            <p>{resultados.respirador}</p>
          </div>
        </div>
      );
    }

    export default App;
