const actions = {
  async getUserList(page) {
    const request = await fetch(
      `https://randomuser.me/api/?page=${page || 1}&results=40`
    );
    const { results } = await request.json();
    this.users = results;
  },
};

export default { ...actions };
