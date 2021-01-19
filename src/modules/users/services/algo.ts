class algo {
  public async meContrata(
    samuel: string,
    junior: boolean,
  ): Promise<IProgrammer> {
    const me = this.ormRepository.create({
      name: samuel,
      dev: junior,
    });
  }
}
