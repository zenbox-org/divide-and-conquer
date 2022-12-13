export interface GenericSession<Err> {
  error: Err
}

export interface SessionState<Err, Sess extends GenericSession<Err>> {
  sessions: Sess[]
}
