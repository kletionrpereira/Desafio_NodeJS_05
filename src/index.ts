import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);

	class Aluno {
		nome;
		idade;
		nota;

		constructor(nome: string, idade: number, nota: number) {
			this.nome = nome;
			this.idade = idade;
			this.nota = nota;
		}
	}

	let aluno1 = new Aluno("Maria", 30, 8.5);
	let aluno2 = new Aluno("Roberto", 30, 9.3);
	let aluno3 = new Aluno("Kleiton", 25, 9.5)

	const alunos: Array<Aluno> = [];
	alunos.push(aluno1, aluno2, aluno3);

	let somaNotas = 0;
	let somaIdades = 0;

	for (let i = 0; i < alunos.length; i++) {
		
		somaNotas = somaNotas + alunos[i].nota;
		somaIdades = somaIdades + alunos[i].idade;
	}

	const somaAlunos = new Aluno("Somas", somaIdades, somaNotas)
	alunos.push(somaAlunos);	

	const ObjectToCsv = require('objects-to-csv');
 
	(async () => {
		const csv = new ObjectToCsv(alunos);
		await csv.toDisk('./arquivo.csv');
		
	})();
});
 